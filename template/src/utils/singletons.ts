import mobile from 'is-mobile';
import {Logger} from 'lines-logger';

import {SessionHolder} from '../types/model';

import {Api} from './api';
import {loggerFactory} from './loggerFactory';
import {SessionHolderImpl} from './sessionHolder';
import {Xhr} from './xhr';

export const globalLogger: Logger =
    loggerFactory.getLoggerColor('global', '#007a70');
export const sessionHolder: SessionHolder = new SessionHolderImpl();
const xhr: Xhr = new Xhr();
export const api: Api = new Api(xhr);
export const isMobile = mobile.isMobile();
