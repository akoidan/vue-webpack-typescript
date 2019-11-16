import {expect} from "chai";
import {getUniqueId} from "../src/utils/getUniqueId";

const test = async(): Promise<void> => {
  await describe("getUniqueId", (): void => {
    it("should inc", () => {
      const res = getUniqueId();
      const res2 = getUniqueId();
      expect(res2).to.be.equal(res + 1); // eslint-disable-line
    });
  });
  run();
};

test().catch((err) => {
  console.error(`error during setting up test${err}`); // eslint-disable-line no-console
  process.exit(1); // eslint-disable-line
});
