import Vue from 'vue'
import Vuex from 'vuex'

const {ipcRenderer} = window.require('electron');

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

const actions = {
  [ACTION.GET_CONTAINERS]({commit}) {
    ipcRenderer.send('fetch-docker-process');
    ipcRenderer.on('docker-ps-result', (event, containers) => {
      commit(MUTATION.SET_CONTAINERS, containers);
    });
  },
};

const mutations = {
  [MUTATION.SET_CONTAINERS](state, containers) {
    state.containers = containers;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
