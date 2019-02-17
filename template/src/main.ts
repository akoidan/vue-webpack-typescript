import './utils/classComponentHooks.ts';
import Vue from 'vue';
import App from './components/App.vue';
import router from './utils/router';
import store from './utils/store';
import {globalLogger} from "./utils/singletons";
import loggerFactory from "./utils/loggerFactory";

Vue.mixin({
  computed: {
    logger() {
      if (!this.__logger && this.$options['_componentTag'] !== 'router-link') {
        let name = this.$options['_componentTag'] || 'vue-comp';
        if (!this.$options['_componentTag']) {
          globalLogger.warn('Can\'t detect tag of {}', this)();
        }
        if (this.id) {
          name += `:${this.id}`;
        }
        this.__logger = loggerFactory.getLoggerColor(name, '#35495e');
      }
      return this.__logger;
    }
  },
  updated: function() {
    this.logger && this.logger.trace('Updated')();
  },
  created: function() {
    this.logger &&  this.logger.trace('Created')();
  },
});

document.addEventListener('DOMContentLoaded', function () {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});
