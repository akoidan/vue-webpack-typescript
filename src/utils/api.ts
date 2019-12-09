import {Post, User} from "@/types/dto";
import {API_URL} from "@/utils/consts";
import {Logger} from "lines-logger";
import {Xhr} from "@/utils/xhr";
import {loggerFactory} from "@/utils/loggerFactory";


/**
 * Http rest api
 */
export class Api {
  protected readonly logger: Logger;

  private readonly xhr: Xhr;

  // https://github.com/typescript-eslint/typescript-eslint/pull/801#issuecomment-555160908
  public constructor(xhr: Xhr) { // eslint-disable-line @typescript-eslint/no-untyped-public-signature
    this.logger = loggerFactory.getLoggerColor(
      "api",
      "red",
    );
    this.xhr = xhr;
  }

  public async getPosts(): Promise<Post[]> {
    return this.xhr.doGet<Post[]>(`${API_URL}/posts`);
  }

  public async getUsers(): Promise<User[]> {
    return this.xhr.doGet<User[]>(`${API_URL}/users`);
  }
}
