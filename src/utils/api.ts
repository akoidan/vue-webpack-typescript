import {Logger} from "lines-logger";
import {Xhr} from "@/utils/xhr";
import {User} from "@/types/model";


export class Api {
  protected readonly logger: Logger;

  private readonly xhr: Xhr;

  // https://github.com/typescript-eslint/typescript-eslint/pull/801#issuecomment-555160908
  public constructor(
    xhr: Xhr, logger: Logger,
  ) {
    this.logger = logger;
    this.xhr = xhr;
  }

  public async getUsers(): Promise<User[]> {
    return this.xhr.doRequest({url: "/users", method: "GET"});
  }
}
