import Vue from 'vue';
import Router from 'vue-router';
import RootLayout from '@/components/layouts/RootLayout.vue';
import LoginController from '@/components/login/LoginController.vue';

Vue.use(Router);

const About = () => import(/* webpackChunkName: "about" */ '@/components/About.vue');
const Home = () => import(/* webpackChunkName: "home" */ '@/components/Home.vue');

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/login', name: 'login', component: LoginController },
    { path: '', component: RootLayout, children: [
      { path: '/about', name: 'about', component: About },
      { path: '/', name: 'home', component: Home, alias: ['/home'] }
    ] }
  ]
});
