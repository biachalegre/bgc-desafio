const pup = require("puppeteer");

const url = "https://www.mercadolivre.com.br/";
const searchFor = "macbook";

let pageNumber = 1;

(async () => {
  const browser = await pup.launch({ headless: false });
  const page = await browser.newPage();
  console.log("Navegador aberto");

  await page.goto(url);
  console.log("Página aberta");

  await page.waitForSelector("#cb1-edit");

  await page.type("#cb1-edit", searchFor);

  await Promise.all([
    page.waitForNavigation(),
    await page.click(".nav-search-btn"),
  ]);

  const links = await page.$$eval(".ui-search-item__group > a", (el) =>
    el.map((link) => link.href)
  );

  // console.log(links);

  for (const link of links) {
    if (pageNumber === 10) continue;
    await page.goto(link);
    await page.waitForSelector(".ui-pdp-title");

    const title = await page.$eval(
      ".ui-pdp-title",
      (element) => element.innerText
    );

    const price = await page.$eval(
      ".andes-money-amount__fraction",
      (element) => element.innerText
    );

    const obj = { title, price };
    console.log(obj);

    pageNumber++;
  }

  setTimeout(async () => {
    await browser.close();
  }, 3000);
})();
