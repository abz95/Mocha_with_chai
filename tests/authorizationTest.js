const { expect } = require('chai');
const { sendHttpRequest } = require('../utils/httpHandlers');
const { readConfigFile } = require('../utils/configReader');
const config = readConfigFile('../resources/configs/awsData.json');

describe('API Gateway Authorization Tests', function() {
  
  it('Should return 401 Forbidden if no authorizationToken header is provided', async function() {
    try {
        const response = await sendHttpRequest('GET', config.endPointURL);
        expect(response.status).to.equal(401);
    } 
    catch (error) {
        throw error;
    }
  });

  it('Should return 401 Unauthorized for authorizationToken header with value "unauthorized"', async function() {
    try {
        headers = { authorizationToken: 'unauthorized' };
        const response = await sendHttpRequest('GET', config.endPointURL, headers);
        expect(response.status).to.equal(401);
    } 
    catch (error) {
        throw error;
    }
  });

  it('Should return 403 Forbidden for authorizationToken header with value "Bearer deny"', async function() {
    try {
        headers = { authorizationToken: 'Bearer deny' };
        const response = await sendHttpRequest('GET', config.endPointURL, headers);
        expect(response.status).to.equal(403);
    } 
    catch (error) {
        throw error;
    }
  });

  it('Should return 200 OK for authorizationToken header with value "Bearer allow"', async function() {
    try {
        headers = { authorizationToken: 'Bearer allow' };
        const response = await sendHttpRequest('GET', config.endPointURL, headers);
        expect(response.status).to.equal(200);
    } 
    catch (error) {
        throw error;
    }
  });

  it('Should return 500 Internal Server Error for authorizationToken header with any other value', async function() {
    try {
        headers = { authorizationToken: 'randomValue' };
        const response = await sendHttpRequest('GET', config.endPointURL, headers);
        expect(response.status).to.equal(500);
    } 
    catch (error) {
        throw error;
    }
  });
});
