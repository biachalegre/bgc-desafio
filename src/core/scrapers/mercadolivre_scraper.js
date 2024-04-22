const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const url = "https://www.mercadolivre.com.br/mais-vendidos";

// (async () => {

exports.scraper = async function () {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
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

  await browser.close();

  return data;
};
// })();
