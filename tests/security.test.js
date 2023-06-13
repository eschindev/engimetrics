const security = require('../security');
const event = require('./event.json');

test('validate slack request', () => {
    const signature = event["headers"]["x-slack-signature"];
    const signingSecret = "df947df11733ad26573d0ab64cd2e3dc";
    expect(security.validateSlackRequest(event, signingSecret)).toBe(true)
});