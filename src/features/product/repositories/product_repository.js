const AWS = require("../../../core/config/database");

/**
 * Cliente DocumentClient para interagir com o DynamoDB.
 * @type {AWS.DynamoDB.DocumentClient}
 */
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**
 * Nome da tabela no DynamoDB onde os dados dos produtos são armazenados.
 * @constant {string}
 */
const tableName = "product";

/**
 * Recupera todos os produtos da tabela DynamoDB.
 * @async
 * @function fetch
 * @returns {Promise<Array>} Uma promise que resolve em um array contendo todos os produtos.
 */
async function fetch() {
  const params = { TableName: tableName };
  const dynamoData = await dynamodb.scan(params).promise();

  return dynamoData.Items;
}

/**
 * Salva os produtos na tabela DynamoDB.
 * @async
 * @function save
 * @param {Array<ProductModel>} products - Um array contendo objetos de produto a serem salvos.
 * @returns {Promise<boolean>} Uma promise que resolve em verdadeiro se os produtos forem salvos com sucesso, caso contrário, falso.
 */
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

module.exports = {
  fetch: fetch,
  save: save,
};
