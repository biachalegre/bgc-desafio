class ProductModel {
  constructor(productId, name, price, category, imgUrl) {
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.category = category;
    this.imgUrl = imgUrl;
  }

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
