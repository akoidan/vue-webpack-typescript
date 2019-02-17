import loggerFactory from './loggerFactory';
import {Logger} from 'lines-logger';
import Xhr from './xhr';
import {TestResponse} from "../types/dto";

export default class Api  {
    private readonly  xhr: Xhr;
    protected readonly logger: Logger;

    constructor(xhr: Xhr) {
        this.logger = loggerFactory.getLoggerColor('api', 'red');
        this.xhr = xhr;
    }

    public async test(a: string): Promise<TestResponse> {
       return await this.xhr.post<TestResponse>('/test/', {a});
    }

}
