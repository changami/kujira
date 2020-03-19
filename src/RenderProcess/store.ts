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

type OwnState = {
  containers: ContainerData[];
};

const state: OwnState = {
  containers: [],
};

const getters = {
  containers: (state): ContainerData[] => state.containers,
};

const actions = {
  [ACTION.GET_CONTAINERS]({ commit }): void {
    ipcRenderer.send(FETCH_ALL_CONTAINERS);
    ipcRenderer.once(
      ALL_CONTAINERS_DATA_EXCHANGE,
      (event: IpcRendererEvent, containers: ContainerData[]) => {
        commit(MUTATION.SET_CONTAINERS, containers);
      },
    );
  },
};

const mutations = {
  [MUTATION.SET_CONTAINERS](state: OwnState, containers: ContainerData[]): void {
    state.containers = containers;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
