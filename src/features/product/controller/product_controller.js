const repository = require("../repositories/product_repository");
const ProductModel = require("../models/product_model");

/**
 * @returns {Promise<ProductModel[]>} Uma promessa que resolve para um array de produtos.
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
 * @returns {Promise<boolean>} Uma promessa que resolve para um array de produtos.
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
