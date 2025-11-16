import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import CharacterCreatePage from '@/pages/CharacterCreatePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/character/create',
    name: 'CharacterCreate',
    component: CharacterCreatePage,
  },
];

const router = createRouter({
  history: createWebHashHistory('/larp-helper/'),
  routes,
});

export default router;
