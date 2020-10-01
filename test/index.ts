import * as chaiAsPromised from "chai-as-promised"; // eslint-disable-line import/no-namespace
import * as sinonChai from "sinon-chai"; // eslint-disable-line import/no-namespace
import {expect, use} from "chai";
import {getUniqueId} from "@/utils/helpers";

use(sinonChai);
use(chaiAsPromised);


describe("getUniqueId", (): void => {
  it("should inc", () => {
    const res = getUniqueId();
    const res2 = getUniqueId();
    expect(res2).to.not.be.equal(res); // eslint-disable-line
  });
});
