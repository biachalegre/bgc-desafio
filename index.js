const pup = require("puppeteer");

const url = "https://www.mercadolivre.com.br/";

(async () => {
  const browser = await pup.launch({ headless: false });
  const page = await browser.newPage();
  console.log("Navegador aberto");

  await page.goto(url);
  console.log("Página aberta");
})();
