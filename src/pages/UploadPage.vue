<script setup lang="ts">
import readXlsxFile from 'read-excel-file';
import { parseExcelData, type ProcessedRow } from '@/utils/parseExcelData';
import DataTable from '@/components/DataTable.vue';
import { ref } from 'vue';

const headers = ref<string[]>([]);
const data = ref<ProcessedRow[]>([]);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (!file) return;
  
  readXlsxFile(file).then((rows) => {
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
  }).catch((error) => {
    console.error('Error reading file:', error);
  });
};
</script>

<template>  
  <div class="upload-page">
    <h1>Загрузка Excel файлов</h1>
    <div class="upload-section">
      <input type="file" @change="handleFileChange" accept=".xlsx" />
    </div>
    <DataTable :headers="headers" :data="data" />
  </div>
</template>

<style scoped>
.upload-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.upload-page h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.upload-section {
  margin-bottom: 30px;
  text-align: center;
}

.upload-section input[type="file"] {
  padding: 10px;
  border: 2px dashed #3498db;
  border-radius: 8px;
  background-color: #f8f9fa;
  cursor: pointer;
  font-size: 16px;
}

.upload-section input[type="file"]:hover {
  border-color: #2980b9;
  background-color: #e3f2fd;
}
</style>
