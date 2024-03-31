const AWS = require('aws-sdk');
const { readConfigFile } = require('./configReader');
const config = readConfigFile('../resources/configs/awsData.json'); //a signle config file containing variables that we might need to change frequently

// Seting up AWS creds, 
AWS.config.update({
    region: config.region,
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    }
});

async function invokeLambdaFunction() {

    const lambda = new AWS.Lambda();
    try {    
        const params = {
            FunctionName: config.lambdaFunctionName,
            InvocationType: 'RequestResponse', 
            LogType: 'None'
        };
        const data = await lambda.invoke(params).promise();
    
        return data.$response.httpResponse.statusCode;

    } 
    catch (err) {
        console.error('Error invoking Lambda function:', err);
        return -1;
    }
  };
  
  async function getFileInformation() {
    
    const s3 = new AWS.S3();
    const bucketName = config.s3BucketName;
    const fileName = config.s3FileName;

    try {
        const headObjectParams = {
        Bucket: bucketName,
        Key: fileName
      };

        await s3.headObject(headObjectParams).promise();
        const getObjectParams = {
        Bucket: bucketName,
        Key: fileName
    };

    const data = await s3.getObject(getObjectParams).promise();
   
    // Extracting relevant information
    const { LastModified, ContentType } = data;
    const fileContent = data.Body.toString('utf-8');

    return {
    name: fileName,
    type: ContentType,
    lastModified: LastModified,
    content: fileContent
    };

    } 
    catch (err) {

        if (err.code === 'NotFound') {
            console.error(`File ${fileName} not found in bucket ${bucketName}`);
            return null;

        } 
        else {
            console.error(`Error retrieving content and metadata for file ${fileName} in bucket ${bucketName}:`, err);
            throw err;
        }
    }
  }
  
  module.exports = { invokeLambdaFunction, getFileInformation};