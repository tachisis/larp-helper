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
  <div class="flex flex-col max-w-[50%] m-auto items-center gap-2">
    <p class="text-sm italic">
      В разделе «Заявки» нажмите на кнопку «Скачать в Excel» и потом загрузите файл сюда:
    </p>
    <label for="file-input" v-if="label">{{ label }}</label>
    <Input type="file" @change="handleFileChange" :accept="accept" />
  </div>
</template>

<style scoped></style>
