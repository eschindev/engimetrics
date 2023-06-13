const replyBody = require('./replyBody.json');


console.log(replyBody.event.hasOwnProperty('thread_ts'));
inKey = Object.keys(replyBody)
console.log(replyBody["event"][`${inKey[0]}`]);
//console.log(getChannel(replyBody))

function getChannel(obj) {
    if (obj.channel) return obj.channel;
    inObj = Object.keys(obj);
    return getChannel(obj[Object.keys(obj[0])]);
}
