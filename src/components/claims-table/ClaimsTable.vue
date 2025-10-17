<script setup lang="ts">
import type { ProcessedRow } from '@/utils/parseExcelData';
import type { ColumnDef, FilterFnOption } from '@tanstack/vue-table';
import { computed } from 'vue';
import { DataTable } from '@/components/ui/data-table';
import { columnConfigs } from './columns';
import { columnFilters } from './filters';

interface Props {
  data: ProcessedRow[];
  columnVisibility?: Partial<Record<keyof ProcessedRow, boolean>>;
}

const props = withDefaults(defineProps<Props>(), {
  columnVisibility: () => ({}),
});

// Create columns directly from ProcessedRow properties
const columns = computed((): ColumnDef<ProcessedRow, any>[] =>
  columnConfigs
    .filter(config => props.columnVisibility[config.property] !== false) // Filter hidden columns
    .map(config => ({
      id: config.property,
      header: config.header,
      accessorFn: (row: ProcessedRow) => row[config.property] || '',
      filterFn:
        config.property === 'playPreferences' ||
        config.property === 'triggers' ||
        config.property === 'preferredCharacterGender' ||
        config.property === 'preferredCharacterRace' ||
        config.property === 'preferredCharacterClass' ||
        config.property === 'anthropomorphism' ||
        config.property === 'preferredPlotTypes' ||
        config.property === 'readyToLead'
          ? ('multiSelect' as FilterFnOption<ProcessedRow>)
          : undefined,
      meta: {
        headerClassName: `whitespace-nowrap truncate ${config.width}`,
        cellClassName: `align-top ${config.width}`,
      },
    }))
);
</script>

<template>
  <DataTable :columns="columns" :data="props.data" :column-filters="columnFilters" />
</template>
