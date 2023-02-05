import Vue from 'vue';

import App from './app.vue';

import '@/assets/scss/global.scss';

import '@/injection';

import router from './router';

import store from './store';

import { initStores } from '@/utils/stores';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  extends: initStores(),
  render: h => h(App)
}).$mount('#app');
