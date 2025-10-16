<script setup lang="ts">
import type { ProcessedRow } from '@/utils/parseExcelData';
import { computed, ref } from 'vue';
import { DataTable } from '@/components/ui/data-table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { columnConfigs, defaultColumnVisibility } from './columns';
import { columnFilters } from './filters';

interface Props {
  data: ProcessedRow[];
}

const props = defineProps<Props>();

// Column visibility management (using imported default configuration)
const columnVisibility = ref<Partial<Record<keyof ProcessedRow, boolean>>>({
  ...defaultColumnVisibility,
});

// State of collapsible column panel
const isColumnPanelOpen = ref(false);

// Create columns directly from ProcessedRow properties
const columns = computed(() =>
  columnConfigs
    .filter(config => columnVisibility.value[config.property] !== false) // Filter hidden columns
    .map(config => ({
      id: config.property,
      header: config.header,
      accessorFn: (row: ProcessedRow) => row[config.property] || '',
      filterFn:
        config.property === 'playPreferences'
          ? ('multiSelect' as any)
          : config.property === 'triggers'
            ? ('triggers' as any)
            : undefined,
      meta: {
        headerClassName: `whitespace-nowrap truncate ${config.width}`,
        cellClassName: `align-top ${config.width}`,
      },
    }))
);
</script>

<template>
  <div class="flex flex-col h-screen space-y-4">
    <Collapsible
      v-model:open="isColumnPanelOpen"
      class="border rounded-lg bg-muted/50 flex-shrink-0"
    >
      <CollapsibleTrigger as-child>
        <Button variant="ghost" class="w-full justify-between p-4 h-auto">
          <span class="text-sm font-medium">Настройка колонок</span>
          <svg
            :class="['h-4 w-4 transition-transform', isColumnPanelOpen ? 'rotate-180' : '']"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent class="px-4 pb-4">
        <div class="flex flex-wrap gap-2">
          <label
            v-for="config in columnConfigs"
            :key="config.property"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              :checked="columnVisibility[config.property] !== false"
              @change="
                columnVisibility[config.property] = ($event.target as HTMLInputElement).checked
              "
              class="rounded border-gray-300"
            />
            <span class="text-sm">{{ config.header }}</span>
          </label>
        </div>
      </CollapsibleContent>
    </Collapsible>

    <div class="flex-1 min-h-0">
      <DataTable :columns="columns" :data="props.data" :column-filters="columnFilters" />
    </div>
  </div>
</template>
