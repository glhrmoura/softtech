import Vue from 'vue';

import App from './app.vue';

import '@/assets/scss/global.scss';

import '@/injection';

import router from './router';

import store from './store';

import { vuexInit } from '@/utils/vuex';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  extends: vuexInit(),
  render: h => h(App)
}).$mount('#app');
