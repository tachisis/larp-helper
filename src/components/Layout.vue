<script setup lang="ts">
interface Props {
  sidebarClass?: string;
  contentClass?: string;
}

const { sidebarClass = '', contentClass = '' } = defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-[20%_1fr] gap-6 md:flex-1 md:min-h-0">
    <div class="flex flex-col gap-4 md:flex-1 md:min-h-0" :class="sidebarClass">
      <slot name="sidebar" />
    </div>

    <div class="flex flex-col gap-4 min-w-0 md:flex-1 md:min-h-0" :class="contentClass">
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped></style>
