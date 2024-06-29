import AboutView from '@/views/AboutView.vue';
import HomeView from '@/views/HomeView.vue';
import ManageView from '@/views/ManageView.vue';
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
  console.log(to.meta);

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
