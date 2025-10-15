<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.push('/');
};
</script>

<template>
  <div class="about-page">
    <div class="container">
      <h1>О проекте LARP Helper</h1>
      
      <div class="content">
        <section class="section">
          <h2>🎯 Назначение</h2>
          <p>
            LARP Helper - это веб-приложение, предназначенное для упрощения работы с данными 
            участников LARP (Live Action Role-Playing) мероприятий. Приложение позволяет 
            загружать и обрабатывать Excel файлы с информацией об участниках.
          </p>
        </section>

        <section class="section">
          <h2>⚡ Возможности</h2>
          <ul>
            <li>Загрузка Excel файлов (.xlsx)</li>
            <li>Автоматическая обработка данных</li>
            <li>Корректировка заголовков</li>
            <li>Удобное отображение в табличном виде</li>
            <li>Адаптивный дизайн</li>
          </ul>
        </section>

        <section class="section">
          <h2>🛠️ Технологии</h2>
          <p>
            Приложение построено на современном стеке технологий:
          </p>
          <ul>
            <li>Vue 3 с Composition API</li>
            <li>TypeScript для типобезопасности</li>
            <li>Vite для быстрой разработки</li>
            <li>Vue Router для маршрутизации</li>
            <li>read-excel-file для работы с Excel</li>
          </ul>
        </section>
      </div>

      <div class="actions">
        <button @click="goBack" class="btn btn-primary">
          ← Вернуться на главную
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding: 40px 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.about-page h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
}

.content {
  margin-bottom: 40px;
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  color: #34495e;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.section p {
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 15px;
}

.section ul {
  color: #7f8c8d;
  line-height: 1.6;
  padding-left: 20px;
}

.section li {
  margin-bottom: 8px;
}

.actions {
  text-align: center;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}
</style>
