<template>
  <div class="flex items-center gap-2">
    <span class="text-sm font-medium">{{ config.label }}:</span>
    <div class="flex items-center gap-2">
      <Select :model-value="selectedValues" @update:model-value="handleValueChange" multiple>
        <SelectTrigger :class="config.triggerClass || 'w-[300px]'">
          <SelectValue :placeholder="config.placeholder || 'Select options...'" />
        </SelectTrigger>
        <SelectContent
          side="bottom"
          align="start"
          :side-offset="4"
          :avoid-collisions="false"
          class="max-h-[300px] overflow-y-auto"
        >
          <SelectItem v-for="option in config.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>

    <!-- Not equal mode checkbox -->
    <div v-if="config.allowNotEqual" class="flex items-center gap-1">
      <input
        :id="`not-equal-${config.columnId}`"
        type="checkbox"
        v-model="isNotEqualMode"
        class="rounded border-gray-300"
      />
      <label :for="`not-equal-${config.columnId}`" class="text-xs text-muted-foreground">
        Не равно
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface FilterOption {
  value: string;
  label: string;
}

export interface ColumnFilterConfig {
  columnId: string;
  label: string;
  placeholder?: string;
  triggerClass?: string;
  options: FilterOption[];
  filterFn?: (row: any, columnId: string, filterValue: string[]) => boolean;
  allowNotEqual?: boolean; // Allow "not equal" mode
}

interface Props {
  config: ColumnFilterConfig;
  modelValue: string[];
}

interface Emits {
  (e: 'update:modelValue', value: string[]): void;
  (e: 'filterChange', columnId: string, value: string[], isNotEqual?: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedValues = ref<string[]>(props.modelValue);
const isNotEqualMode = ref(false);

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  newValue => {
    selectedValues.value = newValue;
  },
  { deep: true }
);

// Watch for internal changes and emit events
watch(
  selectedValues,
  newValue => {
    emit('update:modelValue', newValue);
    emit('filterChange', props.config.columnId, newValue, isNotEqualMode.value);
  },
  { deep: true }
);

// Watch for not equal mode changes
watch(isNotEqualMode, () => {
  emit('filterChange', props.config.columnId, selectedValues.value, isNotEqualMode.value);
});

const handleValueChange = (value: any) => {
  selectedValues.value = Array.isArray(value) ? value : [];
};
</script>

<style scoped>
/* Force select content to open downward */
:deep([data-radix-popper-content-wrapper]) {
  transform: none !important;
}

:deep([data-radix-popper-content]) {
  transform: none !important;
}
</style>
