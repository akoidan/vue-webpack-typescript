import {loggerFactory} from '@/utils/loggerFactory';
import {Logger} from 'lines-logger';


/**
 * @param params : object dict of params or DOM form
 * @param callback : function calls on response
 * @param url : string url to post
 * @param formData : form in canse form is used
 */

export class Xhr {
  protected httpLogger: Logger;

  constructor() {
    this.httpLogger = loggerFactory.getLoggerColor('http', '#680061');
  }

  async get<T>(url: string): Promise<T> {
    return this.sendXhr<T>('GET', url, null);
  }

  async post<T>(url: string, body: object): Promise<T> {
    return this.sendXhr<T>('POST', url, JSON.stringify(body));
  }

  async postFormData<T>(url: string, params: {[index: string]: string|Blob}):
      Promise<T> {
    const formData = new FormData();
    for (const i in params) {
      if (params.hasOwnProperty(i)) {
        formData.append(i, params[i]);
      }
    }
    return this.sendXhr<T>('POST', url, formData);
  }

  async sendXhr<T>(method: string, url: string, body: Document|BodyInit|null):
      Promise<T> {
    const r: XMLHttpRequest = new XMLHttpRequest();
    return new Promise<T>((resolve, reject) => {
      r.onerror = () => {
        this.httpLogger.error(
            '{} out: {} ::: {}, status: {}', method, url, r.response,
            r.status)();
        reject();
      };
      r.onload = () => {
        const success = [200, 201].indexOf(r.status) >= 0;
        if (success) {
          this.httpLogger.log('{} in {} ::: {};', method, url, r.response)();
        } else {
          this.httpLogger.error(
              '{} out: {} ::: {}, status: {}', method, url, r.response,
              r.status)();
        }
        let error;
        let data;
        if (r.status === 0) {
          reject();
        } else if (success) {
          try {
            data = JSON.parse(r.response);
          } catch (e) {
            error = `Unable to parse response ${e}`;
          }
          if (data) {
            resolve(data);
          } else if (error) {
            reject(error);
          }

        } else {
          reject(r.response);
        }
      };

      r.open(method, url, true);

      this.httpLogger.log('{} out {} ::: {}', method, url, body)();

      r.send(body);
      return r;
    });
  }
}
