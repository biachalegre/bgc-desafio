const repository = require("../repositories/product_repository");
const ProductModel = require("../models/product_model");

/**
 * @returns {Promise<ProductModel[]>} Uma promessa que resolve para um array de produtos.
 */
exports.fetch = async function () {
  try {
    const data = await repository.fetch();
    var products = [];
    for (const item in data) {
      const product = new ProductModel(
        item.id,
        item.name,
        item.price,
        item.category,
        item.imgUrl
      );

      products.push(product);
    }
  } catch (error) {}

  return products;
};
