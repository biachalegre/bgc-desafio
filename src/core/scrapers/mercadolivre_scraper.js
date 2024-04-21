const pup = require("puppeteer");
const url = "https://www.mercadolivre.com.br/mais-vendidos";

exports.scraper = async function () {
  const browser = await pup.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const products = (await page.$$(".andes-carousel-snapped__slide")).slice(
    0,
    3
  );

  let data = [];

  for await (const product of products) {
    const productId = await product.$eval(".andes-card", (e) =>
      e.getAttribute("id")
    );

    const imgUrl = await product.$eval("img", (e) => e.getAttribute("src"));

    const name = await product.$eval(
      ".dynamic-carousel__title",
      (e) => e.innerText
    );

    const price = await product.$eval(".dynamic-carousel__price > span", (e) =>
      e.innerText.replace("R$", "").trim()
    );

    const decimal = await product.$eval(
      ".dynamic-carousel__price-decimals",
      (e) => e.innerText
    );

    const obj = {
      productId: productId,
      imgUrl: imgUrl,
      name: name,
      price: price + "." + decimal,
    };

    data.push(obj);
  }

  console.log(data);

  await browser.close();
};
