import Vue from 'vue';
import App from './components/App.vue';
import router from './router';
import store from './store';
import iView from 'iview';
import '@/assets/styles/base.scss';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(iView);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
