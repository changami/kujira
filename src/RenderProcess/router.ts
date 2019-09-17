import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('./components/Index.vue').default
    },
    {
      path: '/images',
      name: 'images',
      component: require('./components/Images.vue').default
    },
    {
      path: '/containers',
      name: 'containers',
      component: require('./components/Containers.vue').default
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  },
});

export default router