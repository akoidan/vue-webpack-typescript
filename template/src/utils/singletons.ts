import {SessionHolder} from '@/types/model';
import {Api} from '@/utils/api';
import {loggerFactory} from '@/utils/loggerFactory';
import {SessionHolderImpl} from '@/utils/sessionHolder';
import {Xhr} from '@/utils/xhr';
import mobile from 'is-mobile';
import {Logger} from 'lines-logger';

export const globalLogger: Logger =
    loggerFactory.getLoggerColor('global', '#007a70');
export const sessionHolder: SessionHolder = new SessionHolderImpl();
const xhr: Xhr = new Xhr();
export const api: Api = new Api(xhr);
export const isMobile = mobile.isMobile();
