import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
window.Vue = Vue;

import store from "./store/"
import router from "./router"

const app = new window.Vue({
  router,
  el: '#app',
  store,
  created() {
  }
});
