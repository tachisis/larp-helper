<script setup lang="ts">
import type { ProcessedRow } from '@/utils/parseExcelData';
import { ref, watch } from 'vue';
import { columnConfigs, defaultColumnVisibility } from '@/components/claims-table/columns';
import { Checkbox } from '@/components/ui/checkbox';

interface Props {
  modelValue?: Partial<Record<keyof ProcessedRow, boolean>>;
}

interface Emits {
  (e: 'update:modelValue', value: Partial<Record<keyof ProcessedRow, boolean>>): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({ ...defaultColumnVisibility }),
});

const emit = defineEmits<Emits>();

// Local state for column visibility
const columnVisibility = ref<Partial<Record<keyof ProcessedRow, boolean>>>({
  ...props.modelValue,
});

// Update parent when local state changes
watch(
  columnVisibility,
  newValue => {
    emit('update:modelValue', { ...newValue });
  },
  { deep: true },
);
</script>

<template>
  <div class="border flex-1 flex flex-col min-h-0">
    <h3 class="text-lg font-heading font-semibold pt-4 pb-2 px-6">
      Настройка колонок
    </h3>
    <p class="text-xs px-6 pb-2">
      Выберите колонки, которые вы хотите отображать в таблице
    </p>
    <div class="py-4 px-6 max-h-[200px] md:max-h-none md:flex-1 md:min-h-0 overflow-y-auto">
      <div class="flex flex-col gap-2">
        <label
          v-for="config in columnConfigs"
          :key="config.property"
          class="flex items-center space-x-2 cursor-pointer"
        >
          <Checkbox
            :model-value="columnVisibility[config.property] !== false"
            @update:model-value="
              (value: boolean | 'indeterminate') =>
                (columnVisibility[config.property] = value === true)
            "
          />
          <span class="text-sm">{{ config.header }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
