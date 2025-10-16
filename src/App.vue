<script setup lang="ts"></script>

<template>
  <div id="app-container" class="min-h-screen flex flex-col">
    <nav class="p-4 flex items-center justify-center">
      <RouterLink to="/" class="flex items-center gap-2">
        <img src="/logo.svg" alt="LARP Helper" class="w-12 h-12" />
        <span class="text-2xl font-bold">LARP Helper</span>
      </RouterLink>
    </nav>

    <main class="p-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
