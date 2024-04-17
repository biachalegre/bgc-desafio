const pup = require("puppeteer");

const url = "https://www.mercadolivre.com.br/";
const searchFor = "macbook";

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

  setTimeout(async () => {
    await browser.close();
  }, 3000);
})();
