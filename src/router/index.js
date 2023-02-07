import Vue from 'vue';

import VueRouter from 'vue-router';

import beforeEach from '@/router/beforeEach';

import Home from '@/views/Home';
import Team from '@/views/Team';
import TeamMember from '@/views/TeamMember';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/team',
    component: { template: '<router-view />' },
    children: [
      {
        path: '/',
        name: 'Team',
        component: Team,
        meta: { filter: true },
      },
      {
        path: ':username',
        name: 'TeamMember',
        component: TeamMember,
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
