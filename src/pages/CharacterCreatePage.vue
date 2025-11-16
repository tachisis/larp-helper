<script setup lang="ts">
import Layout from '@/components/Layout.vue';
import CharacterForm from '@/components/CharacterForm.vue';
import { ref } from 'vue';

const formData = ref({
  characterName: '',
  characterDescription: '',
  preferredCharacterGender: '',
  anthropomorphism: '',
  preferredCharacterRace: '',
  preferredCharacterClass: '',
  playPreferences: [] as string[],
  preferredPlotTypes: [] as string[],
  triggers: [] as string[],
  readyToLead: false,
  plotIdeas: '',
  appearance: '',
});

const handleSubmit = (data: typeof formData.value) => {
  console.log('Character data:', data);
  // TODO: Implement save logic
};
</script>

<template>
  <Layout :has-sidebar="false" content-class="w-full">
    <template #content>
      <h1 class="text-3xl font-bold mb-2">Описание персонажа</h1>
      <CharacterForm v-model="formData" @submit="handleSubmit" />
    </template>
  </Layout>
</template>

<style scoped></style>
