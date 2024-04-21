const productController = require("./src/features/product/controller/product_controller");
const productsPath = "/products";

/**
 * Função de manipulador de eventos para lidar com as requisições HTTP.
 * @param {Object} event - O evento da requisição recebida pelo Lambda.
 * @returns {Object} Uma resposta HTTP conforme especificado pela função Lambda.
 */
exports.handler = async function (event) {
  try {
    console.log("Request event: ", event);
    let response;
    switch (true) {
      case event.httpMethod === "GET" && event.path === productsPath:
        response = await getProducts();
        break;
      case event.httpMethod === "POST" && event.path === productsPath:
        response = await saveProducts(JSON.parse(event.body));
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

/**
 * Obtém todos os produtos.
 * @returns {Object} Uma resposta HTTP contendo os produtos recuperados.
 */
async function getProducts() {
  const products = await productController.fetch();
  const body = {
    products: products,
  };
  return buildResponse(200, body);
}

/**
 * Salva produtos.
 * @param {Object} requestBody - O corpo da requisição contendo os produtos a serem salvos.
 * @returns {Object} Uma resposta HTTP indicando o resultado da operação de salvamento.
 */
async function saveProducts(requestBody) {
  console.log("Request Body: ", requestBody);
  const result = await productController.save(requestBody);
  console.log("ProductsSaved: ", result);

  const body = {
    operation: "SAVE",
    status: result,
  };
  return buildResponse(200, body);
}

/**
 * Constrói uma resposta HTTP.
 * @param {number} statusCode - O código de status HTTP da resposta.
 * @param {Object} body - O corpo da resposta em formato JSON.
 * @returns {Object} Uma resposta HTTP com o código de status e corpo especificados.
 */
function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}
