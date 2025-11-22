<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, ColumnFiltersState, VisibilityState } from '@tanstack/vue-table';
import { FlexRender, getCoreRowModel, getFilteredRowModel, useVueTable } from '@tanstack/vue-table';
import { ref, computed } from 'vue';

import { Input } from '@/components/ui/input';
import { ColumnFilter } from '@/components/ui/column-filter';
import type { ColumnFilterConfig } from '@/components/ui/column-filter/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronDownIcon } from 'lucide-vue-next';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterConfigs?: ColumnFilterConfig[];
}

const props = defineProps<DataTableProps<TData, TValue>>();

const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const globalFilter = ref('');

const isFiltersPanelOpen = ref(true);

// Store filter values for each column
const filterValues = ref<Record<string, string[]>>({});

// Store not equal mode for each column
const notEqualModes = ref<Record<string, boolean>>({});

// Store AND/OR mode for each column
const andModes = ref<Record<string, boolean>>({});

// Check if any filters are active
const hasActiveFilters = computed(() => {
  const hasColumnFilters = Object.keys(filterValues.value).some(
    key => filterValues.value[key] && filterValues.value[key].length > 0
  );
  const hasGlobalFilter = globalFilter.value && globalFilter.value.trim() !== '';
  return hasColumnFilters || hasGlobalFilter;
});

// Reset all filters function
const resetAllFilters = () => {
  // Clear all filter values
  filterValues.value = {};

  // Clear all not equal modes
  notEqualModes.value = {};

  // Clear all AND/OR modes
  andModes.value = {};

  // Clear column filters
  columnFilters.value = [];

  // Clear global filter
  globalFilter.value = '';

  // Reset table filters
  table.setColumnFilters([]);
  table.setGlobalFilter('');
};

// Handle filter changes from ColumnFilter components
const handleFilterChange = (
  columnId: string,
  value: string[],
  isNotEqual?: boolean,
  isAndMode?: boolean
) => {
  filterValues.value[columnId] = value;
  if (isNotEqual !== undefined) {
    notEqualModes.value[columnId] = isNotEqual;
  }
  if (isAndMode !== undefined) {
    andModes.value[columnId] = isAndMode;
  }

  // Update column filters
  const currentFilters = columnFilters.value.filter(f => f.id !== columnId);
  if (value.length > 0) {
    currentFilters.push({ id: columnId, value });
  }
  columnFilters.value = currentFilters;
};

// Universal filter function for multi-select filters with optional not equal mode and AND/OR logic
const multiSelectFilterFn = (row: any, columnId: string, filterValue: string[]) => {
  if (!filterValue.length) return true;

  const cellValue = row.getValue(columnId);
  if (!cellValue) return notEqualModes.value[columnId] ? true : false;

  const cellText = String(cellValue).toLowerCase();
  const isNotEqual = notEqualModes.value[columnId] || false;
  const isAndMode = andModes.value[columnId] !== false; // Default to AND mode (OR mode is false)

  if (isNotEqual) {
    // NOT EQUAL mode: none of the selected filters should be present
    return !filterValue.some(filter => cellText.includes(filter.toLowerCase()));
  } else {
    // EQUAL mode: check based on AND/OR logic
    if (isAndMode) {
      // AND logic: all selected filters must be present
      return filterValue.every(filter => cellText.includes(filter.toLowerCase()));
    } else {
      // OR logic: at least one selected filter must be present
      return filterValue.some(filter => cellText.includes(filter.toLowerCase()));
    }
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
    multiSelect: multiSelectFilterFn,
    ...(props.filterConfigs?.reduce(
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
  <div class="flex flex-col flex-1 min-h-0">
    <Collapsible v-model:open="isFiltersPanelOpen" class="border bg-muted/40 flex-shrink-0">
      <CollapsibleTrigger as-child>
        <Button variant="ghost" class="w-full justify-between p-4 h-auto">
          <div class="flex items-center gap-3">
            <h3 class="text-lg font-heading font-semibold">Фильтры</h3>
            <Button
              variant="outline"
              size="sm"
              :disabled="!hasActiveFilters"
              class="text-xs"
              @click.stop="resetAllFilters"
            >
              Сбросить все
            </Button>
          </div>
          <ChevronDownIcon
            :class="['h-4 w-4 transition-transform', isFiltersPanelOpen ? 'rotate-180' : '']"
            aria-hidden="true"
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent class="px-4 pb-4">
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ColumnFilter
              v-for="filterConfig in props.filterConfigs"
              :key="filterConfig.columnId"
              :config="filterConfig"
              :model-value="filterValues[filterConfig.columnId] || []"
              @filter-change="handleFilterChange"
            />
            <div class="flex flex-col gap-2">
              <label for="globalFilter" class="text-sm font-medium">Поиск</label>
              <Input
                id="globalFilter"
                :model-value="table.getState().globalFilter ?? ''"
                placeholder="Введите текст для поиска..."
                class="w-full"
                @update:model-value="table.setGlobalFilter($event)"
              />
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>

    <div class="text-sm text-muted-foreground py-2">
      <span v-if="table.getFilteredRowModel().rows.length === props.data.length">
        Всего заявок: {{ props.data.length }}
      </span>
      <span v-else>
        Найдено заявок: {{ table.getFilteredRowModel().rows.length }} из {{ props.data.length }}
      </span>
    </div>

    <div class="flex-1 min-h-0 border w-full max-w-full overflow-auto [&>div]:overflow-visible">
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
              :title="header.column.columnDef.header"
              class="sticky top-0 z-10 bg-muted"
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
