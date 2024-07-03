import AboutView from '@/views/About.vue';
import HomeView from '@/views/Home.vue';
import ManageView from '@/views/Manage.vue';
import SongView from '@/views/Song.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import useUserStore from '@/stores/user';

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView
  },
  {
    name: 'about',
    path: '/about',
    component: AboutView
  },
  {
    name: 'manage',
    // alias: '/mange',
    path: '/manage-music',
    component: ManageView,
    meta: { requiresAuth: true }
  },
  { name: 'song', path: '/song/:id', component: SongView },
  {
    // also you can render a 40 components here insted of redirectring
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }
  const store = useUserStore();
  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
