import Vue from 'vue';
import VueRouter from 'vue-router';
import Containers from './components/Containers.vue';
import Images from './components/Images.vue';
import Index from './components/Index.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/images',
      name: 'images',
      component: Images,
    },
    {
      path: '/containers',
      name: 'containers',
      component: Containers,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  },
});

export default router;
