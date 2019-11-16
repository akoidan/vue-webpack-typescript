import {assert, expect} from 'chai';
import {getUniqueId} from "../src/utils/getUniqueId";

const test = async () => {
  await describe('getUniqueId', async () => {
    it('should inc', async () => {
      let res = getUniqueId();
      let res2 = getUniqueId();
      expect(res2).to.be.equal(res + 1);
    });
  });
  run();
};

test().catch(e => {
  console.error('error during setting up test' + e);
  process.exit(1);
});
