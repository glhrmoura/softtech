import Vue from 'vue';

import Vuex from 'vuex';

import team from './modules/team';
import device from './modules/device';
import header from './modules/header';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    team,
    device,
    header,
  },
});
