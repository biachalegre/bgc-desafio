const AWS = require("../../../core/config/database");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const params = { TableName: "product" };

exports.fetch = async function () {
  const dynamoData = await dynamodb.scan(params).promise();

  return dynamoData.Items;
};
