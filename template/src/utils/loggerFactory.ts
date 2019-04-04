import {IS_DEBUG} from '@/utils/consts';
import {LoggerFactory, LogStrict} from 'lines-logger';


export const loggerFactory: LoggerFactory =
    new LoggerFactory(IS_DEBUG ? LogStrict.LOG_RAISE_ERROR : LogStrict.ERROR);
