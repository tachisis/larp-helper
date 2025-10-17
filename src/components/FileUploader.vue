<script setup lang="ts">
import { ref } from 'vue';
import { Upload } from 'lucide-vue-next';
import Input from './ui/input/Input.vue';

interface Props {
  handleFileChange: (event: Event) => void;
  accept: string;
  title?: string;
  description?: string;
}

const { handleFileChange, accept = '.xlsx', title, description } = defineProps<Props>();

const isDragOver = ref(false);

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = true;
};

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;

  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    const file = files[0];

    // Check if file type is accepted
    if (accept && !file.name.toLowerCase().endsWith(accept.toLowerCase())) {
      alert(`Пожалуйста, выберите файл с расширением ${accept}`);
      return;
    }

    // Create a synthetic event to match the expected interface
    const syntheticEvent = {
      target: {
        files: [file],
      },
    } as unknown as Event;

    handleFileChange(syntheticEvent);
  }
};

const handleFileInputChange = (event: Event) => {
  handleFileChange(event);
};
</script>

<template>
  <div class="flex flex-col items-center gap-2 p-6">
    <h3 class="text-lg font-heading font-semibold" v-if="title">{{ title }}</h3>
    <p class="text-xs mb-4" v-if="description">{{ description }}</p>

    <div
      class="flex flex-col items-center gap-4 p-6 border-2 border-dashed rounded-lg transition-colors w-full max-w-md"
      :class="
        isDragOver
          ? 'border-primary bg-primary/5'
          : 'border-muted-foreground/25 hover:border-primary/50'
      "
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <Upload class="w-8 h-8 text-primary" />

      <div class="text-center">
        <p class="text-xs text-muted-foreground mb-4">
          {{ isDragOver ? 'Отпустите файл здесь' : 'Перетащите файл сюда или' }}
        </p>
        <label
          class="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer hover:bg-primary/90 transition-colors"
        >
          Выберите файл
          <Input type="file" @change="handleFileInputChange" :accept="accept" class="hidden" />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
