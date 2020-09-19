const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const dynamoLib = require('dynamo-lib');


exports.handler = async (event, context, callback) => {
	console.log('Event: ', JSON.stringify(event, null, 2));

	const itemData = {
		id: event.id,
		title: event.title,
		watchHref: event.watchHref,
		authorId: event.authorId,
		length: event.length,
		category: event.category
	};
	await dynamoLib.putItemDynamoDB(process.env.DynamoTable, itemData);
	callback(null, itemData)
};
