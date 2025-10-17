<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <label :for="`${config.columnId}-filter`" class="text-sm font-medium"
        >{{ config.label }}
      </label>
      <div v-if="config.allowNotEqual" class="flex items-center gap-2">
        <Checkbox
          :id="`not-equal-${config.columnId}`"
          v-model="isNotEqualMode"
          class="text-secondary"
        />
        <label :for="`not-equal-${config.columnId}`" class="text-sm text-gray-700 cursor-pointer">
          Исключить
        </label>
      </div>
    </div>

    <div class="flex items-center gap-2 w-full">
      <Select :model-value="selectedValues" @update:model-value="handleValueChange" multiple>
        <SelectTrigger :class="config.triggerClass || 'w-full'" :id="`${config.columnId}-filter`">
          <SelectValue :placeholder="config.placeholder || 'Select options...'" />
        </SelectTrigger>
        <SelectContent
          side="bottom"
          align="start"
          :side-offset="4"
          :avoid-collisions="false"
          class="max-h-[400px] overflow-y-auto"
        >
          <SelectItem v-for="option in config.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
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
import Checkbox from '@/components/ui/checkbox/Checkbox.vue';
import type { ColumnFilterConfig } from './types';

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
const isNotEqualMode = ref(props.config.defaultNotEqual || false);

// Debug: log the initialization
console.log('ColumnFilter initialized:', {
  columnId: props.config.columnId,
  defaultNotEqual: props.config.defaultNotEqual,
  isNotEqualMode: isNotEqualMode.value,
});

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
