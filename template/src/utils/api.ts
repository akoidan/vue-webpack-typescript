import {TestResponse} from '@/types/dto';
import {API_URL} from '@/utils/consts';
import {loggerFactory} from '@/utils/loggerFactory';
import {Xhr} from '@/utils/xhr';
import {Logger} from 'lines-logger';

/**
 * Http rest api
 */
export class Api {
  protected readonly logger: Logger;
  private readonly xhr: Xhr;

  constructor(xhr: Xhr) {
    this.logger = loggerFactory.getLoggerColor('api', 'red');
    this.xhr = xhr;
  }

  public async test(a: string): Promise<TestResponse> {
    return this.xhr.doPost<TestResponse>(`${API_URL}/api/v1/employees`, {a});
  }
}
