import * as chaiAsPromised from "chai-as-promised";
import * as sinonChai from "sinon-chai";
import {expect, use} from "chai";
import {Xhr} from "@/utils/xhr";
import {getUniqueId} from "@/utils/getUniqueId";
import {stub} from "sinon";

use(sinonChai);
use(chaiAsPromised);


describe("getUniqueId", (): void => {
  it("should inc", () => {
    const res = getUniqueId();
    const res2 = getUniqueId();
    expect(res2).to.be.equal(res + 1); // eslint-disable-line
  });
});

describe("Xhr", (): void => {
  it("should cover post", async() => {
    const xhr = new Xhr();
    const xhrSpy = stub(xhr, "sendXhr");
    await xhr.doPost("/test/url", {ad: "a"});
    expect(xhrSpy).to.have.been.calledOnceWithExactly("POST", "/test/url", "{\"ad\":\"a\"}");
  });
});
