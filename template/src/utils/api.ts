import {Logger} from 'lines-logger';

import {TestResponse} from '../types/dto';

import {loggerFactory} from './loggerFactory';
import {Xhr} from './xhr';

export class Api {
  private readonly xhr: Xhr;
  protected readonly logger: Logger;

  constructor(xhr: Xhr) {
    this.logger = loggerFactory.getLoggerColor('api', 'red');
    this.xhr = xhr;
  }

  async test(a: string): Promise<TestResponse> {
    return await this.xhr.post<TestResponse>('/test/', {a});
  }
}
