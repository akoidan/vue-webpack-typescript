import {Api} from "@/utils/api";
import {Logger} from "lines-logger";
import {SessionHolder} from "@/types/model";
import {SessionHolderImpl} from "@/utils/sessionHolderImpl";
import {Xhr} from "@/utils/xhr";
import isMobile from "is-mobile";
import {loggerFactory} from "@/utils/loggerFactory";

const xhr: Xhr = new Xhr();

const globalLogger: Logger = loggerFactory.getLoggerColor("global", "#007a70");
const sessionHolder: SessionHolder = new SessionHolderImpl();
const api: Api = new Api(xhr);
const mobile: boolean = isMobile.isMobile();

export {globalLogger, sessionHolder, api, mobile};
