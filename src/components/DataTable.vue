<script setup lang="ts">
import type { ProcessedRow } from '@/utils/parseExcelData';

interface Props {
  headers: string[];
  data: ProcessedRow[];
}

defineProps<Props>();
</script>

<template>  
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.name">
          <td v-for="value in row" :key="value">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  white-space: nowrap;
}
</style>