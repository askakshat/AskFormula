import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto('http://localhost:4173');
  await new Promise(r => setTimeout(r, 3000));

  await page.screenshot({ path: 'landing-preview-stars.png', fullPage: true });
  await browser.close();
  console.log("Screenshot saved.");
})();
