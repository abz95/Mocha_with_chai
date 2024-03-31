const axios = require('axios');

async function sendHttpRequest(requestType, url, headers, body) {
    try {
        let requestConfig = {
            method: requestType,
            url: url,
            headers: headers || {}, // If headers are provided, we will use them and if not we are using an empty object
            data: body 
        };

        const response = await axios(requestConfig);
        return response;
    } 
    catch (error) {
        return error.response;
    }
}

module.exports = { sendHttpRequest };