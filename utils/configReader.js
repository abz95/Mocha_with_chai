const fs = require('fs');
const path = require('path');

function readConfigFile(filePath) {
    const fullPath = path.join(__dirname, filePath);
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

module.exports = { readConfigFile };