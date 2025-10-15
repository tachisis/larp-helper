import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import UploadPage from '@/pages/UploadPage.vue';
import AboutPage from '@/pages/AboutPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/upload',
    name: 'Upload',
    component: UploadPage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  }
];

const router = createRouter({
  history: createWebHashHistory('/larp-helper/'),
  routes
});

export default router;
