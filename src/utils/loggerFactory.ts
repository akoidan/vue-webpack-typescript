import {IS_DEBUG} from "@/utils/consts";
import {LogStrict, LoggerFactory} from "lines-logger";

export const loggerFactory: LoggerFactory =
    new LoggerFactory(IS_DEBUG ? LogStrict.LOG_RAISE_ERROR : LogStrict.ERROR);
