import {loggerFactory} from "@/utils/loggerFactory";
import {Logger} from "lines-logger";

/**
 * Low level XmlHttpRequest api, something like Axios
 */
export class Xhr {

  protected httpLogger: Logger;

  constructor () {

    this.httpLogger = loggerFactory.getLoggerColor(
      "http",
      "#680061"
    );

  }

  public async doGet<T> (url: string): Promise<T> {

    return this.sendXhr<T>(
      "GET",
      url,
      undefined
    );

  }

  public async doPost<T> (url: string, body: object): Promise<T> {

    return this.sendXhr<T>(
      "POST",
      url,
      JSON.stringify(body)
    );

  }

  public async postFormData<T> (url: string, params: {[index: string]: string|Blob}):
      Promise<T> {

    const formData: FormData = new FormData();
    Object.keys(params).
      forEach((i: string) => {

        if (params.hasOwnProperty(i)) {

          formData.append(
            i,
            params[i]
          );

        }

      });

    return this.sendXhr<T>(
      "POST",
      url,
      formData
    );

  }

  private async sendXhr<T> (method: string, url: string, body: Document|BodyInit|undefined):
      Promise<T> {

    const r: XMLHttpRequest = new XMLHttpRequest();

    return new Promise<T>((resolve: Function, reject: Function): void => {

      r.onerror = (): void => {

        this.httpLogger.error(
          "{} out: {} ::: {}, status: {}",
          method,
          url,
          r.response,
          r.status
        )();
        reject();

      };
      r.onload = (): void => {

        const success: boolean = [
          200,
          201
        ].indexOf(r.status) >= 0;
        if (success) {

          this.httpLogger.log(
            "{} in {} ::: {};",
            method,
            url,
            r.response
          )();

        } else {

          this.httpLogger.error(
            "{} out: {} ::: {}, status: {}",
            method,
            url,
            r.response,
            r.status
          )();

        }
        let data: string| undefined,
          error: string| undefined;
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

      r.open(
        method,
        url,
        true
      );

      this.httpLogger.log(
        "{} out {} ::: {}",
        method,
        url,
        body
      )();

      r.send(body);

    });

  }

}
