<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, ColumnFiltersState, VisibilityState } from '@tanstack/vue-table';
import { FlexRender, getCoreRowModel, getFilteredRowModel, useVueTable } from '@tanstack/vue-table';
import { ref } from 'vue';

import { Input } from '@/components/ui/input';
import { ColumnFilter, type ColumnFilterConfig } from '@/components/ui/column-filter';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnFilters?: ColumnFilterConfig[];
}

const props = defineProps<DataTableProps<TData, TValue>>();

const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const globalFilter = ref('');

// Store filter values for each column
const filterValues = ref<Record<string, string[]>>({});

// Store not equal mode for each column
const notEqualModes = ref<Record<string, boolean>>({});

// Handle filter changes from ColumnFilter components
const handleFilterChange = (columnId: string, value: string[], isNotEqual?: boolean) => {
  filterValues.value[columnId] = value;
  if (isNotEqual !== undefined) {
    notEqualModes.value[columnId] = isNotEqual;
  }

  // Update column filters
  const currentFilters = columnFilters.value.filter(f => f.id !== columnId);
  if (value.length > 0) {
    currentFilters.push({ id: columnId, value });
  }
  columnFilters.value = currentFilters;
};

// Default filter function for multi-select filters (AND logic)
const defaultMultiSelectFilterFn = (row: any, columnId: string, filterValue: string[]) => {
  if (!filterValue.length) return true;

  const cellValue = row.getValue(columnId);
  if (!cellValue) return false;

  const cellText = String(cellValue).toLowerCase();
  // All selected filters must be present in the cell text (AND logic)
  return filterValue.every(filter => cellText.includes(filter.toLowerCase()));
};

// Custom filter function for triggers with not equal mode support
const triggersFilterFn = (row: any, columnId: string, filterValue: string[]) => {
  if (!filterValue.length) return true;

  const cellValue = row.getValue(columnId);
  if (!cellValue) return notEqualModes.value[columnId] ? true : false;

  const cellText = String(cellValue).toLowerCase();
  const isNotEqual = notEqualModes.value[columnId] || false;

  if (isNotEqual) {
    // NOT EQUAL mode: none of the selected filters should be present
    return !filterValue.some(filter => cellText.includes(filter.toLowerCase()));
  } else {
    // EQUAL mode: all selected filters must be present (AND logic)
    return filterValue.every(filter => cellText.includes(filter.toLowerCase()));
  }
};

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  globalFilterFn: 'includesString',
  onColumnFiltersChange: updaterOrValue => {
    columnFilters.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(columnFilters.value) : updaterOrValue;
  },
  onColumnVisibilityChange: updaterOrValue => {
    columnVisibility.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnVisibility.value)
        : updaterOrValue;
  },
  onGlobalFilterChange: updaterOrValue => {
    globalFilter.value =
      typeof updaterOrValue === 'function' ? updaterOrValue(globalFilter.value) : updaterOrValue;
  },
  filterFns: {
    multiSelect: defaultMultiSelectFilterFn,
    triggers: triggersFilterFn,
    ...(props.columnFilters?.reduce(
      (acc, filter) => {
        if (filter.filterFn) {
          acc[filter.columnId] = filter.filterFn;
        }
        return acc;
      },
      {} as Record<string, any>
    ) || {}),
  },
  state: {
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get globalFilter() {
      return globalFilter.value;
    },
  },
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex items-center gap-4 py-4 flex-shrink-0">
      <Input
        :model-value="table.getState().globalFilter ?? ''"
        placeholder="Search across all columns..."
        class="max-w-sm"
        @update:model-value="table.setGlobalFilter($event)"
      />

      <!-- Dynamic column filters -->
      <ColumnFilter
        v-for="filterConfig in props.columnFilters"
        :key="filterConfig.columnId"
        :config="filterConfig"
        :model-value="filterValues[filterConfig.columnId] || []"
        @filter-change="handleFilterChange"
      />
    </div>
    <!-- Results count -->
    <div class="text-sm text-muted-foreground py-2">
      <span v-if="table.getFilteredRowModel().rows.length === props.data.length">
        Всего строк: {{ props.data.length }}
      </span>
      <span v-else>
        Найдено строк: {{ table.getFilteredRowModel().rows.length }} из {{ props.data.length }}
      </span>
    </div>

    <div class="rounded-md border flex-1">
      <Table class="table-fixed">
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :class="
                (header.column.columnDef.meta as any)?.headerClassName ||
                (header.column.columnDef.meta as any)?.className
              "
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                :class="
                  (cell.column.columnDef.meta as any)?.cellClassName ||
                  (cell.column.columnDef.meta as any)?.className
                "
              >
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              Нет результатов.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
