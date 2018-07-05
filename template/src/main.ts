import './classComponentHooks.ts';
import Vue from 'vue';
import App from './components/App.vue';
import router from './router';
import store from './store';


document.addEventListener('DOMContentLoaded', function () {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});
