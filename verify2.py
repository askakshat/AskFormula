import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()

        # Check landing
        page = await browser.new_page(viewport={"width": 1280, "height": 3000})
        await page.goto("http://localhost:4173")
        await page.wait_for_load_state("networkidle")
        await page.screenshot(path="landing_page_twinkles.png", full_page=True)

        # Check build page (emerald accents and liquid glass)
        await page.goto("http://localhost:4173/build")
        await page.wait_for_load_state("networkidle")
        await page.screenshot(path="build_page_emerald.png", full_page=True)

        print("Screenshots saved.")
        await browser.close()

asyncio.run(run())
