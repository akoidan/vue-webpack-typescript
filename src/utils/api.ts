import {Logger} from "lines-logger";
import {Xhr} from "@/utils/xhr";
import {Branch} from "@/types/model";
import {CommitResponse} from "@/types/gitCommit";


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

  public async getBranches(): Promise<Branch[]> {
    return this.xhr.doRequest({
      method: "GET",
      url: "/branches",
    });
  }

  public async getCommit(sha: string): Promise<CommitResponse> {
    return this.xhr.doRequest({
      method: "GET",
      url: `/commits/${sha}`,
    });
  }
}
