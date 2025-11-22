<script setup lang="ts">
import readXlsxFile from 'read-excel-file';
import { ref } from 'vue';
import { ClaimsTable } from '@/components/claims-table';
import FileUploader from '@/components/FileUploader.vue';
import Layout from '@/components/Layout.vue';
import ColumnSettings from '@/components/ColumnSettings.vue';
import { type ProcessedRow, parseExcelData } from '@/utils/parseExcelData';
import { defaultColumnVisibility } from '@/components/claims-table/columns';

const data = ref<ProcessedRow[]>([]);
const columnVisibility = ref<Partial<Record<keyof ProcessedRow, boolean>>>({
  ...defaultColumnVisibility,
});

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  readXlsxFile(file)
    .then(rows => {
      const headersRow = rows[0];
      const correctedHeaders = headersRow.map((header: any, index: number) => {
        if (header === null && index === 1) {
          return 'Ссылка';
        }
        return header;
      });
      const processedData = parseExcelData(correctedHeaders, rows);
      data.value = processedData;
    })
    .catch(error => {
      console.error('Error reading file:', error);
    });
};
</script>

<template>
  <Layout>
    <template #sidebar>
      <FileUploader
        :handle-file-change="handleFileChange"
        :accept="'.xlsx'"
        class="border"
        title="Загрузите файл с заявками"
        description="В разделе «Заявки» нажмите на кнопку «Скачать в Excel» и потом загрузите файл сюда"
      />
      <ColumnSettings v-model="columnVisibility" />
    </template>

    <template #content>
      <ClaimsTable v-if="data.length > 0" :data="data" :column-visibility="columnVisibility" />
      <div v-else class="flex items-center justify-center h-64 text-muted-foreground">
        <p class="text-center">
          Загрузите Excel файл для отображения результатов
        </p>
      </div>
    </template>
  </Layout>
</template>

<style scoped></style>
