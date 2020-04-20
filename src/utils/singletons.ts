import {LogStrict, Logger, LoggerFactory} from "lines-logger";
import {Api} from "@/utils/api";
import {ApiConsts} from "@/utils/consts";
import {Xhr} from "@/utils/xhr";

// istanbul ignore next-line ignore IS_DEBUG on next line
const loggerFactory: LoggerFactory = new LoggerFactory(
  ApiConsts.IS_DEBUG ? LogStrict.LOG_RAISE_ERROR : LogStrict.ERROR,
);

const xhr: Xhr = new Xhr(
  loggerFactory.getLoggerColor("http", "#680061"),
  fetch,
);
const globalLogger: Logger = loggerFactory.getLoggerColor("global", "#007a70");
const api: Api = new Api(xhr, loggerFactory.getLoggerColor("api", "red"));

export {globalLogger, api, loggerFactory, xhr};
