# engimetrics

A Slackbot micro-service designed to run on an AWS Lambda in conjunction with API Gateway and a DynamoDB table. This app subscribes to events from channels to which it is added, and saves anonymized data (channel ID, interaction type, and timestamp) to a DynamoDB table for usage analysis.

# technologies

- Node.js
- AWS Lambda
- AWS API Gateway
- AWS DynamoDB
- Websocket Client
- Docker
- bcrypt
