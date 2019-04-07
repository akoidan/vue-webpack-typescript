import {loggerFactory} from '@/utils/loggerFactory';
import {Logger} from 'lines-logger';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

/**
 * Injects $logger to every component
 */
@Component
export class LoggerMixin extends Vue {
  private privateLogger: Logger|null = loggerFactory.getLogger('tasd', 'black');

  private id: string = '';

  public get $logger(): Logger {
    let res: Logger | null = this.privateLogger;
    if (!this.privateLogger) {
      res = loggerFactory.getLoggerColor(this.id, '#35495e');
    }

    return <Logger>res;  // safe for component
  }
  public updated(): void {
    if (this.$logger) {
      this.$logger.trace('Updated')();
    }
  }

  public created(): void {
    if (this.$logger) {
      this.$logger.trace('Created')();
    }
  }
}

Vue.mixin(LoggerMixin);
