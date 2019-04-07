import {Component, Vue} from "vue-property-decorator";
import {Logger} from "lines-logger";
import {globalLogger} from "@/utils/singletons";
import {loggerFactory} from "@/utils/loggerFactory";

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
