const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = "product";
const productsPath = "/products";
