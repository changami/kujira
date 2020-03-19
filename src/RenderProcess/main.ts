import Vue, { VNode } from 'vue';
import Vuex from 'vuex';
import Application from './Application.vue';
import router from './router';
import store from './store';

Vue.use(Vuex);

new Vue({
  router,
  store,
  render: (h): VNode => h(Application),
}).$mount('#app');
