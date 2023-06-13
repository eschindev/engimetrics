const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({ region: 'us-west-1'});

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.saveItem = (item, table, callback) => {
    const params = {
        TableName: `${table}`,
        Item: {
            'uuid': { S: uuidv4() },
            'type': { S: `${item.type}` },
            'channel': { S: `${item.channel}`},
            'event_ts': { S: `${item.event_ts}`}
        }
    };
    ddb.putItem(params, (error, data) => {
        if (error) {
            callback(new Error(error));
        } else {
            callback(null);
        }
    });
};