import type {Branch} from "@/types/model";
import type {CommitResponse} from "@/types/gitCommit";
import type {Logger} from "lines-logger";
import type {Xhr} from "@/utils/xhr";


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
