const db = require('./db');

const security = require('./security');

const signingSecret = process.env.SLACK_SIGNING_SECRET;
const token = process.env.ENGIMETRIC_TOKEN;
const table = process.env.TARGET_DDB_TABLE;

exports.handler = (event, context, callback) => {
    if (security.validateSlackRequest(event, signingSecret)) {
        const body = JSON.parse(event.body);
        switch (body.type) {
            case "url_verification": callback(null, body.challenge); break;
            case "event_callback": processRequest(body, callback); break;
            default: callback(null);
    }
    }
    else callback("verification failed");
};

const processRequest = (body, callback) => {
    if(body.event.hasOwnProperty('thread_ts')) {
        processReply(body, callback);
    } else {
        switch(body.event.type) {
            case "message": processMessage(body, callback); break;
            case "reaction_added": processReaction(body, callback); break;
            default: callback(null);
        }
    }
};

const processMessage = (body, callback) => {
    const item = {
        type: `${body.event.type}`,
        channel: `${body.event.channel}`,
        event_ts: `${body.event.event_ts}`
    }
    db.saveItem(item, table, (error, result) => {
        if (error != null) {
            callback(error)
        } else {
            callback(null)
        }
    })
};

const processReply = (body, callback) => {
    const item = {
        type: "thread_reply",
        channel: `${body.event.channel}`,
        event_ts: `${body.event.event_ts}`
    }
    db.saveItem(item, table, (error, result) => {
        if (error != null) {
            callback(error)
        } else {
            callback(null)
        }
    })
};

const processReaction = (body, callback) => {
    const item = {
        type: `${body.event.type}`,
        channel: `${body.event.item.channel}`,
        event_ts: `${body.event.event_ts}`
    }
    db.saveItem(item, table, (error, result) => {
        if (error != null) {
            callback(error)
        } else {
            callback(null)
        }
    })
};