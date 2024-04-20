const product = require("./src/features/product/repositories/product_repository");
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
  const products = await product.fetch();
  const body = {
    products: products,
  };
  return buildResponse(200, body);
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
