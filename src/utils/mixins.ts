import {Component} from "vue-property-decorator";
import {Logger} from "lines-logger";
import Vue from "vue";
import {globalLogger} from "@/utils/singletons";
import {loggerFactory} from "@/utils/loggerFactory";

/**
 * Injects $logger to every component
 */
@Component
export class LoggerMixin extends Vue {
  private readonly privateLogger!: Logger|null;

  private id: string= "";

  public get $logger(): Logger {
    let res: Logger | null = this.privateLogger;
    if (!this.privateLogger) {
      if (!this.id) {
        globalLogger.warn("Can't detect name of {}", this)();
        this.id = "vue-comp";
      }
      res = loggerFactory.getLoggerColor(this.id, "#35495e");
    }
    // Safe for component
    return res as Logger;
  }

  public updated(): void {
    if (this.$logger) { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
      this.$logger.trace("Updated")();
    }
  }

  public created(): void {
    if (this.$logger) { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
      this.$logger.trace("Created")();
    }
  }
}

Vue.mixin(LoggerMixin);
