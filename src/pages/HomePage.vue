<script setup lang="ts">
import readXlsxFile from 'read-excel-file';
import { ref } from 'vue';
import DataTable from '@/components/DataTable.vue';
import FileUploader from '@/components/FileUploader.vue';
import { type ProcessedRow, parseExcelData } from '@/utils/parseExcelData';

const headers = ref<string[]>([]);
const data = ref<ProcessedRow[]>([]);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;

  readXlsxFile(file)
    .then((rows) => {
      const headersRow = rows[0];
      const correctedHeaders = headersRow.map((header: any, index: number) => {
        if (header === null && index === 1) {
          return 'Ссылка';
        }
        return header;
      });
      headers.value = correctedHeaders;
      const processedData = parseExcelData(correctedHeaders, rows);
      data.value = processedData;
    })
    .catch((error) => {
      console.error('Error reading file:', error);
    });
};
</script>

<template>  
  <div class="mb-6">
    <FileUploader 
      :handleFileChange="handleFileChange" 
      :accept="'.xlsx'" />
  </div>

  <DataTable :headers="headers" :data="data" />  
</template>

<style scoped></style>
