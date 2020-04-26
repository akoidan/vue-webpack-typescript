import {ApiConsts} from "@/utils/consts";
import {Logger} from "lines-logger";
import {RequestOptions} from "@/types/model";

/**
 * Low level fetch api, something like Axios
 */
export class Xhr {
  protected readonly httpLogger: Logger;

  protected readonly fetchApi: (input: RequestInfo, init?: RequestInit) => Promise<Response>;

  private readonly APP_VERSION_HEADER_KEY: string = "app-version";

  // https://github.com/typescript-eslint/typescript-eslint/pull/801#issuecomment-555160908
  public constructor(
    httpLogger: Logger,
    fetchApi: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  ) {
    this.fetchApi = fetchApi;
    this.httpLogger = httpLogger;
  }

  public async parseResponse<R>(response: Response): Promise<R> {
    try {
      return await response.json();
    } catch (err) {
      this.httpLogger.error("Unable to parse server response from {} {}", response, err)();
      throw Error(response.ok ? "Malformed json" : "Http not 200");
    }
  }

  private get requestHeaders(): HeadersInit {
    const headers: HeadersInit = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    // istanbul ignore else
    if (ApiConsts.APP_VERSION) {
      headers[this.APP_VERSION_HEADER_KEY] = ApiConsts.APP_VERSION;
    }
    return headers;
  }

  public async doRequest<TREQ, TRESP>({
    url,
    body = null,
    method,
    parseResponseAsJson = true,
  }: RequestOptions<TREQ>): Promise<TRESP> {
    const fullUrl = `${ApiConsts.API_URL}${url}`;
    this.httpLogger.debug("Fetching {} {}", method, fullUrl)();
    const request: RequestInit = {
      headers: this.requestHeaders,
      method,
    };
    if (body) {
      request.body = JSON.stringify(body);
    }
    return this.makeHttpCall<TRESP>(request, fullUrl, parseResponseAsJson);
  }

  /**
   * /**
   * Extracts http response of fetch to api required Type (js object).
   * If http response is not 2xx / not parsable, throws a user-friendly error
   */
  private async makeHttpCall<TRESP>(
    request: RequestInit,
    fullUrl: string,
    parseResponseAsJson: boolean | undefined,
  ): Promise<TRESP> {
    let response: Response;
    try {
      response = await this.fetchApi.call(null, fullUrl, request);
    } catch (error) {
      this.httpLogger.error("Failed to {}; error {}", request, error)();
      throw Error(`Communication error ${String(error?.message || error)}`);
    }

    if (response.ok && !parseResponseAsJson) {
      return null as unknown as TRESP;
    }
    const parsedResponse: TRESP = await this.parseResponse<TRESP>(response);
    this.httpLogger.trace("{} response code {}, data: {}", fullUrl, response.status, parsedResponse)();
    if (!response.ok) {
      throw Error("Server error");
    }
    return parsedResponse;
  }
}
