import Vue from 'vue'
import Vuex from 'vuex'
import store from "./store/"
import router from "./router"
import Application from "./Application.vue"

Vue.use(Vuex);

const app = new Vue({
  router,
  el: '#app',
  store,
  render: h => h(Application),
  created() {
  }
});
