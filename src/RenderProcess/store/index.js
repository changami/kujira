import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router";

Vue.use(Vuex);

const MUTATION = require('./mutation-types');
const ACTION = require('./action-types');

const state = {
  containers: [],
};

const getters = {
  containers: state => {
    return state.containers;
  },
};

const actions = {};

const mutations = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
