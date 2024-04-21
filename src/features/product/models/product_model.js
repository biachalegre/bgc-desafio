/**
 * Classe representando um modelo de produto.
 * @class ProductModel
 */
class ProductModel {
  /**
   * Cria uma instância de ProductModel.
   * @param {string} productId - O ID do produto.
   * @param {string} name - O nome do produto.
   * @param {number} price - O preço do produto.
   * @param {string} category - A categoria do produto.
   * @param {string} imgUrl - O URL da imagem do produto.
   */
  constructor(productId, name, price, category, imgUrl) {
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.category = category;
    this.imgUrl = imgUrl;
  }

  /**
   * Converte o objeto ProductModel em um objeto JSON.
   * @returns {Object} Um objeto contendo os atributos do produto em formato JSON.
   */
  toJSON() {
    return {
      productId: this.productId,
      name: this.name,
      price: this.price,
      category: this.category,
      imgUrl: this.imgUrl,
    };
  }
}

module.exports = ProductModel;
