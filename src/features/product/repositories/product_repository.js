const AWS = require("../../../core/config/database");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "product";

// exports.fetch = async function () {
//   const dynamoData = await dynamodb.scan(params).promise();

//   return dynamoData.Items;
// };

async function fetch() {
  const params = { TableName: tableName };
  const dynamoData = await dynamodb.scan(params).promise();

  return dynamoData.Items;
}

async function save(products) {
  let result = false;

  for (const product of products) {
    const params = { TableName: tableName, Item: product.toJSON() };

    console.log("Repository Params : ", params);
    result = await dynamodb
      .put(params)
      .promise()
      .then(
        () => {
          return true;
        },
        (error) => {
          console.error("repository error ", error);
          return false;
        }
      );

    if (result === false) {
      break;
    }
  }

  console.log("Result Repository: ", result);
  return result;
}

// exports.save = async function (product) {
//   const dynamoData = await dynamodb.put(params, product).promise();

//   return dynamoData.Items;
// };

// exports.save = async function (products) {
//   const params = {
//     TableName: "product",
//     Item: products,
//   };

//   await dynamodb.put(params).promise();

//   return products;
// };

module.exports = {
  fetch: fetch,
  save: save,
};
