const { expect } = require('chai');
const { invokeLambdaFunction,getFileInformation } = require('../utils/awsHelpers');
const { promisify } = require('util');

const sleep = promisify(setTimeout);


describe('Verify Lambda function writes to s3 bucket', () => {

  afterEach(async function() {
    this.timeout(10000);
    await sleep(2000);
  });

  it('Successful triggering of lambda function', async function () {
    this.timeout(10000);
    const lambdaResponse = await invokeLambdaFunction();
    expect(lambdaResponse).to.equal(200);
  });

  it('Verify file creation and content', async function () {
    this.timeout(10000);

    const result = await getFileInformation();
    expect(result).to.not.be.null;


    if (result) {
      const currentTime = new Date();
      const twoMinutesAgo = new Date(currentTime.getTime() - 1 * 60 * 1000);

      const lastModifiedTime = new Date(result.lastModified);

      //assertions
      expect(result.type).to.equal('binary/octet-stream');
      expect(lastModifiedTime).to.be.at.least(twoMinutesAgo);
      expect(lastModifiedTime).to.be.at.most(currentTime);
      expect(result.content).to.include("Hello World");

    } else {
      throw new Error('File not found in bucket');
    }
  });

});
