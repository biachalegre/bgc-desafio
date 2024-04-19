const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-1",
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = "product";
const productsPath = "/products";

exports.handler = async function (event) {
  try {
    console.log("Request event: ", event);
    let response;
    let requestBody;
    switch (true) {
      case event.httpMethod === "GET" && event.path === productsPath:
        response = await getProducts();
        break;
      case event.httpMethod === "POST" && event.path === productsPath:
        response = await saveProducts(JSON.parse(event.body));
        break;
      case event.httpMethod === "PATCH" && event.path === productsPath:
        requestBody = JSON.parse(event.body);
        response = await modifyProducts(requestBody);
        break;
      case event.httpMethod === "DELETE" && event.path === productsPath:
        requestBody = JSON.parse(event.body);
        response = await deleteProducts(requestBody);
        break;
      default:
        response = {
          statusCode: 404,
          body: JSON.stringify("Not Found"),
        };
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

async function getProducts(productsPath) {
  const params = {
    TableName: dynamodbTableName,
  };
  const allProducts = await scanDynamoRecords(params, []);
  const body = {
    products: allProducts,
  };
  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartKey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch (error) {
    console.error("Error scanning dynamo records", error);
    // return null;
  }
}

async function saveProducts(requestBody) {
  const params = {
    TableName: dynamodbTableName,
    Item: requestBody,
  };
  await dynamodb
    .put(params)
    .promise()
    .then(
      () => {
        const body = {
          Operation: "SAVE",
          Message: "SUCCESS",
          Item: requestBody,
        };
        return buildResponse(200, body);
      },
      (error) => {
        console.error("Error saving product", error);
      }
    );

  const body = {
    Operation: "SAVE",
    Message: "SUCCESS",
    Item: requestBody,
  };
  return buildResponse(200, body);
}

async function modifyProducts(productId, updateKey, updateValue) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      productId: productId,
    },
    UpdateExpression: "set ${updateKey} = :value",
    ExpressionAttributeValues: {
      ":value": updateValue,
    },
    ReturnValues: "UPDATED_NEW",
  };
  return await dynamodb
    .update(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operation: "UPDATE",
          Message: "SUCCESS",
          Item: response,
        };
        return buildResponse(200, body);
      },
      (error) => {
        console.error("Error updating product", error);
      }
    );
}

async function deleteProducts(productId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      productId: productId,
    },
    ReturnValues: "ALL_OLD",
  };
  return await dynamodb
    .delete(params)
    .promise()
    .then(
      (response) => {
        const body = {
          Operation: "DELETE",
          Message: "SUCCESS",
          Item: response,
        };
        return buildResponse(200, body);
      },
      (error) => {
        console.error("Error deleting product", error);
      }
    );
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
