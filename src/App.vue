<script setup lang="ts"></script>

<template>
  <div id="app-container" class="h-screen flex flex-col min-h-[700px]">
    <header class="py-2 px-6 md:px-4 border-b border-gray-300">
      <nav class="flex items-center justify-center md:justify-start">
        <RouterLink to="/" class="flex items-center gap-2">
          <img src="/logo.svg" alt="Логотип в виде оранжевой планеты" class="w-12 h-12" />
          <span class="text-2xl font-heading font-bold">LARP Helper</span>
        </RouterLink>
      </nav>
    </header>

    <main class="py-4 px-6 md:p-4 flex-1 flex flex-col min-h-0">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
