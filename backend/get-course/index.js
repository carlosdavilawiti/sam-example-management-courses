const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const dynamoLib = require('dynamo-lib');


exports.handler = async (event, context, callback) => {
    console.log('Event: ', event);

    const itemData = {
        id: event.courseId
    };
    const course = await dynamoLib.get(process.env.DynamoTable, itemData);
    callback(null, course.Item ? course.Item : [])
};
