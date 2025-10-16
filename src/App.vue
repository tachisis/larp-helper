<script setup lang="ts">

</script>

<template>
  <div id="app-container" class="min-h-screen flex flex-col">
    <nav class="p-4">
        <RouterLink to="/" class="flex items-center gap-2">
          <img src="/logo.svg" alt="LARP Helper" class="w-8 h-8" />
          LARP Helper
        </RouterLink>
    </nav>
    
    <main class="p-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
