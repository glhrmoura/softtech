import Vue from 'vue';

import Vuex from 'vuex';

import users from './modules/users';
import device from './modules/device';
import header from './modules/header';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    device,
    header,
  },
});
