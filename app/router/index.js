import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../components/pages/Home';
import Login from '../components/pages/Login';

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {path: '*', redirect: '/login'},
  ],
});

router.replace('/login');

export default router;
