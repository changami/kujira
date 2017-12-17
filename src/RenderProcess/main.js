import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
window.Vue = Vue;

import store from "./store/"
import router from "./router"
import Application from "./Application.vue"

const app = new window.Vue({
  router,
  el: '#app',
  store,
  render: h => h(Application),
  created() {
  }
});
