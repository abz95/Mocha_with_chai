const { expect } = require('chai');
const { sendHttpRequest } = require('../utils/httpHandlers');
const { readConfigFile } = require('../utils/configReader');
const config = readConfigFile('../resources/configs/awsData.json');

describe('API Gateway Authorization Tests', function() {
  
  it('Return 401 Unauthorized if no authorizationToken header is provided', async function() {
    try {
        const response = await sendHttpRequest('GET', config.endPointURL);
        expect(response.status).to.equal(401);
        expect(response.data.message).to.include('Unauthorized');
    } 
    catch (error) {
        throw error;
    }
  });

  it('Return 401 Unauthorized for authorizationToken header with value "unauthorized"', async function() {
    try {
        headers = { authorizationToken: 'unauthorized' };
        const response = await sendHttpRequest('GET', config.endPointURL, headers);
        expect(response.status).to.equal(401);
        expect(response.data.message).to.include('Unauthorized');
    } 
    catch (error) {
        throw error;
    }
  });

  it('Return 403 Forbidden for authorizationToken header with value "Bearer deny"', async function() {
    try {
        message = 'User is not authorized to access this resource with an explicit deny';
        headers = { authorizationToken: 'Bearer deny', Authorization: "Bearer allow" };
        const response = await sendHttpRequest('GET', config.endPointURL, headers);
        expect(response.status).to.equal(403);
        expect(response.data.Message).to.include(message);
    } 
    catch (error) {
        throw error;
    }
  });

  it('Return 200 OK for authorizationToken header with value "Bearer allow"', async function() {
    try {
        headers = { authorizationToken: 'Bearer allow' };
        const response = await sendHttpRequest('GET', config.endPointURL, headers);
        expect(response.status).to.equal(200);
        expect(response.data.requestContext).to.haveOwnProperty('domainName');

    } 
    catch (error) {
        throw error;
    }
  });

  it('Return 200 OK for authorizationToken header with value "Bearer allow" and some additional headers', async function() {
    try {
        headers = { authorizationToken: 'Bearer allow', Authorization: "unauthorized", 'User-Agent': "bot traffic"};
        const response = await sendHttpRequest('GET', config.endPointURL, headers);
        expect(response.status).to.equal(200);
        expect(response.data.requestContext).to.haveOwnProperty('domainName');
    } 
    catch (error) {
        throw error;
    }
  });

  it('Return 500 Internal Server Error for authorizationToken header with any other value', async function() {
    try {
        headers = { authorizationToken: 'randomValue' };
        const response = await sendHttpRequest('GET', config.endPointURL, headers);
        expect(response.status).to.equal(500);
        expect(response.data.message).to.be.null;
    } 
    catch (error) {
        throw error;
    }
  });
});
