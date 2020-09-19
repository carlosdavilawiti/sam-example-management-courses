const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const dynamoLib = require('dynamo-lib');

exports.handler = async (event, context, callback) => {
	console.log('Event: ', JSON.stringify(event, null, 2));
	callback(null, await dynamoLib.getAll(process.env.DynamoTable))
};
