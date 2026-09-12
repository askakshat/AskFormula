import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:4173/build');
  await new Promise(r => setTimeout(r, 2000));

  await page.screenshot({ path: 'build-preview2.png', fullPage: true });
  await browser.close();
  console.log("Screenshot saved.");
})();
