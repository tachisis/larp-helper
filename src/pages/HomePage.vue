<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToUpload = () => {
  router.push('/upload');
};

const navigateToAbout = () => {
  router.push('/about');
};
</script>

<template>
  <div class="home-page">
    <div class="hero-section">
      <h1>LARP Helper</h1>
      <p>Инструмент для работы с данными LARP мероприятий</p>
    </div>
    
    <div class="features">
      <div class="feature-card" @click="navigateToUpload">
        <h3>📊 Загрузка данных</h3>
        <p>Загружайте и обрабатывайте Excel файлы с данными участников</p>
      </div>
      
      <div class="feature-card" @click="navigateToAbout">
        <h3>ℹ️ О проекте</h3>
        <p>Узнайте больше о возможностях LARP Helper</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  margin-bottom: 60px;
}

.hero-section h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.hero-section p {
  font-size: 1.2rem;
  color: #7f8c8d;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.feature-card p {
  color: #7f8c8d;
  line-height: 1.6;
}
</style>
