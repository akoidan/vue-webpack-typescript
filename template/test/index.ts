import {assert, expect} from 'chai';

/* tslint:disable:no-unused-expression */
const test = async () => {
  await describe('test', async () => {
    it('1=1', async () => {
      expect(1).to.be.equal(1);
    });
  });
  run();
};

test().catch(e => {
  console.error('error during setting up test' + e);
  process.exit(1);
});
