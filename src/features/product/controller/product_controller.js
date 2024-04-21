const repository = require("../repositories/product_repository");
const ProductModel = require("../models/product_model");

/**
 * Recupera todos os produtos da fonte de dados.
 * @async
 * @returns {Promise<ProductModel[]>} Uma promise que resolve para um array de objetos ProductModel.
 */
async function fetch() {
  try {
    const data = await repository.fetch();
    var products = [];
    for (let item of data) {
      const product = new ProductModel(
        item.productId,
        item.name,
        item.price,
        item.category,
        item.imgUrl
      );

      products.push(product);
    }
  } catch (error) {}

  return products;
}

/**
 * Salva uma lista de produtos na fonte de dados.
 * @async
 * @param {Object[]} items - Uma lista de objetos representando produtos a serem salvos.
 * @returns {Promise<boolean>} Uma promise que resolve para verdadeiro se os produtos forem salvos com sucesso, caso contrário, falso.
 */
async function save(items) {
  try {
    var products = [];
    console.log("Items: ", items);
    for (let item of items) {
      console.log("item: ", item);
      const product = new ProductModel(
        item.productId,
        item.name,
        item.price,
        item.category,
        item.imgUrl
      );

      products.push(product);
      console.log("Product: ", product);
    }
    console.log("Products Json: ", products);
    return await repository.save(products);
  } catch (error) {
    console.error("Error saving product", error);
  }
}

module.exports = {
  fetch: fetch,
  save: save,
};
