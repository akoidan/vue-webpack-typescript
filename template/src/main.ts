import '@/utils/classComponentHooks.ts';

import App from '@/components/App.vue';
import {GIT_HASH} from '@/utils/consts';
import {loggerFactory} from '@/utils/loggerFactory';
import {router} from '@/utils/router';
import {globalLogger} from '@/utils/singletons';
import {store} from '@/utils/store';
import {Logger} from 'lines-logger';
import {Component, Vue} from 'vue-property-decorator';

window.GIT_VERSION = GIT_HASH;

@Component
export class LoggerMixin extends Vue {
  _logger: Logger|null = null;

  id = '';


  get logger(): Logger {
    interface CompTag {
      _componentTag: string;
    }
    const $option = (this.$options as CompTag)._componentTag;
    if (!this._logger && $option !== 'router-link') {
      let name = $option || 'vue-comp';
      if (!$option) {
        globalLogger.warn('Can\'t detect tag of {}', this)();
      }
      if (this.id) {
        name += `:${this.id}`;
      }
      this._logger = loggerFactory.getLoggerColor(name, '#35495e');
    }
    return this._logger as Logger;  // failsfale for component
  }
  updated() {
    if (this.logger) {
      this.logger.trace('Updated')();
    }
  }
  created() {
    if (this.logger) {
      this.logger.trace('Created')();
    }
  }
}


Vue.mixin(new LoggerMixin());

document.addEventListener('DOMContentLoaded', () => {
  new Vue({router, store, render: h => h(App)}).$mount('#app');
});
