const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const dynamoLib = require('dynamo-lib');

exports.handler = async (event, context, callback) => {
	console.log('Event: ', JSON.stringify(event, null, 2));
	const courses = await dynamoLib.getAll(process.env.DynamoTable);
	callback(null,  courses.Items ? courses.Items.map(item => {
		return {
			id: item.id,
			title: item.title,
			watchHref: item.watchHref,
			authorId: item.authorId,
			length: item.length,
			category: item.category
		}
	}) : [] )
};
