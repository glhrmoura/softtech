import Vue from 'vue';

import VueRouter from 'vue-router';

import beforeEach from '@/router/beforeEach';

import Home from '@/views/Home';
import Users from '@/views/Users';
import UserDetails from '@/views/UserDetails';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/users',
    component: { template: '<router-view />' },
    children: [
      {
        path: '/',
        name: 'Users',
        component: Users,
        meta: { filter: true },
      },
      {
        path: ':username',
        name: 'UserDetails',
        component: UserDetails,
        meta: { subpage: true },
      },
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(beforeEach);

export default router;
