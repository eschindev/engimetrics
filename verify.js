const crypto = require("crypto");

const signingSecret = process.env.SIGNING_SECRET;
const baseString = process.env.BASE_STRING;

const hmac = crypto
  .createHmac("sha256", signingSecret)
  .update(baseString)
  .digest("hex");

console.log(hmac);
