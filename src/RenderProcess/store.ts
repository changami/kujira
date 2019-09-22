import {
  ipcRenderer,
  IpcRendererEvent,
} from 'electron';
import Vue from 'vue';
import Vuex from 'vuex';
import {
  ALL_CONTAINERS_DATA_EXCHANGE,
  FETCH_ALL_CONTAINERS,
} from '../Constants/ipcChannels';
import { ACTION } from './store/action-types';
import { MUTATION } from './store/mutation-types';

Vue.use(Vuex);

const state = {
  containers: [],
};

const getters = {
  containers: state => state.containers,
};

const actions = {
  [ACTION.GET_CONTAINERS]({ commit }) {
    ipcRenderer.send(FETCH_ALL_CONTAINERS);
    ipcRenderer.once(ALL_CONTAINERS_DATA_EXCHANGE, (event: IpcRendererEvent, containers) => {
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
  mutations,
});
