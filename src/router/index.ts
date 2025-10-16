import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHashHistory('/larp-helper/'),
  routes,
});

export default router;
