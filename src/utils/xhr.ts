import {Logger} from "lines-logger";
import {loggerFactory} from "@/utils/loggerFactory";

const HTTP_SUCCESS = 200;
const HTTP_CREATED = 201;
const HTTP_ERR = 0;

/**
 * Low level XmlHttpRequest api, something like Axios
 */
export class Xhr {
  protected httpLogger: Logger;

  constructor() {
    this.httpLogger = loggerFactory.getLoggerColor("http", "#680061");
  }

  public doGet<T>(url: string): Promise<T> {
    return this.sendXhr<T>("GET", url);
  }

  public doPost<T>(url: string, body: object): Promise<T> {
    return this.sendXhr<T>("POST", url, JSON.stringify(body));
  }

  public sendXhr<T>(method: string, url: string, body?: Document|BodyInit): Promise<T> {
    const req: XMLHttpRequest = new XMLHttpRequest();

    return new Promise<T>((resolve: Function, reject: Function): void => {
      // istanbul ignore next
      req.onerror = (): void => {
        this.httpLogger.error("{} out: {} ::: {}, status: {}", method, url, req.response, req.status)();
        reject(Error("Unable to fetch req"));
      };
      req.onload = (): void => {
        const success: boolean = [HTTP_SUCCESS, HTTP_CREATED].indexOf(req.status) >= HTTP_ERR;
        if (success) {
          this.httpLogger.log("{} in {} ::: {};", method, url, req.response)();
        } else {
          // istanbul ignore next
          this.httpLogger.error("{} out: {} ::: {}, status: {}", method, url, req.response, req.status)();
        }
        if (req.status === HTTP_ERR) {
          // istanbul ignore next
          reject(Error("Unable to fetch req"));
        } else if (success) {
          Xhr.parseData(req, resolve, reject);
        } else {
          // istanbul ignore next
          reject(req.response);
        }
      };

      req.open(method, url, true);

      this.httpLogger.log("{} out {} ::: {}", method, url, body)();
      req.send(body);
    });
  }

  private static parseData(req: XMLHttpRequest, resolve: Function, reject: Function): void {
    let data: unknown|null = null;
    let error: unknown|null = null;
    try {
      data = JSON.parse(req.response);
    } catch (err) {
      // istanbul ignore next
      error = `Unable to parse response ${err}`;
    }
    // istanbul ignore else
    if (data) {
      resolve(data);
    } else if (error) {
      reject(error);
    }
  }
}
