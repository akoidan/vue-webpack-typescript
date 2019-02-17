import {Logger} from 'lines-logger';
import loggerFactory from './loggerFactory';
import {SessionHolder} from "../types/model";
import SessionHolderImpl from "./sessionHolder";
import Api from "./api";
import mobile from 'is-mobile';
import Xhr from "./xhr";

export const globalLogger: Logger = loggerFactory.getLoggerColor('global', '#007a70');
export const sessionHolder: SessionHolder= new SessionHolderImpl();
const xhr: Xhr = new Xhr();
export const api: Api = new Api(xhr);
export const isMobile = mobile.isMobile();
