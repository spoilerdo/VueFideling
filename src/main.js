import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import App from './components/App.vue'
import Shop from './components/Shop.vue';
import StockList from './components/StockList.vue';
import Login from './components/Login.vue';
import store from './store';

import { currency } from './currency';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.config.productionTip = true
Vue.filter('currency', currency);

//Router inspired by: https://github.com/vuejs-templates/webpack/issues/215
const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: Shop },
    { path: '/inventory', name: 'inventory', component: StockList },
    { path: '/login', name: 'login', component: Login}
  ]
})

new Vue({
  router,
  store,
  render: createEle => createEle(App)
}).$mount('#app-container');
