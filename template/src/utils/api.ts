import {TestResponse} from '@/types/dto';
import {loggerFactory} from '@/utils/loggerFactory';
import {Xhr} from '@/utils/xhr';
import {Logger} from 'lines-logger';

export class Api {
  private readonly xhr: Xhr;
  protected readonly logger: Logger;

  constructor(xhr: Xhr) {
    this.logger = loggerFactory.getLoggerColor('api', 'red');
    this.xhr = xhr;
  }

  async test(a: string): Promise<TestResponse> {
    return await this.xhr.post<TestResponse>('http://dummy.restapiexample.com/api/v1/employees', {a});
  }
}
