<script setup lang="ts">
import Input from './ui/input/Input.vue';

interface Props {
  handleFileChange: (event: Event) => void;
  accept: string;
  label?: string;
}

const { handleFileChange, accept = '.xlsx', label } = defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-border rounded-lg bg-muted/20"
  >
    <p class="text-sm text-muted-foreground text-center">
      В разделе «Заявки» нажмите на кнопку «Скачать в Excel» и потом загрузите файл сюда:
    </p>
    <label for="file-input" v-if="label" class="text-sm font-medium">{{ label }}</label>
    <Input type="file" @change="handleFileChange" :accept="accept" class="w-full max-w-sm" />
  </div>
</template>

<style scoped></style>
