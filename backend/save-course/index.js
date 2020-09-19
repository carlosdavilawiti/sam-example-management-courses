const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const dynamoLib = require('dynamo-lib');

const replaceAll = (str, find, replace) => {
	return str.replace(new RegExp(find, "g"), replace);
};

exports.handler = async (event, context, callback) => {
	console.log('Event: ', JSON.stringify(event, null, 2));
	const id = replaceAll(event.title, " ", "-").toLowerCase();
	const itemData = {
		id,
		title: event.title,
		watchHref: `url.com/courses/${id}`,
		authorId: event.authorId,
		length: event.length,
		category: event.category
	};
	await dynamoLib.putItemDynamoDB(process.env.DynamoTable, itemData);
	callback(null, itemData)
};
