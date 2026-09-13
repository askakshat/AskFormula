import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 800})

        # Test Quiz Active
        await page.goto("http://localhost:5173/quiz/active")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="quiz_active_screenshot2.png")

        await browser.close()

asyncio.run(main())
