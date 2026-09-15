import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1280, "height": 3000})

        # Start server in background?
        # Actually I can just build and serve it using Vite preview.
        # Wait, the tool is frontend_verification_instructions which suggests writing a verify.py.
        # I'll just rely on `npm run preview` running in background.
        await page.goto("http://localhost:4173")
        await page.wait_for_load_state("networkidle")

        # Scroll down to ensure everything is rendered, especially feature sections
        await page.evaluate("window.scrollTo(0, document.body.scrollHeight/2)")
        await page.wait_for_timeout(1000)

        # Take a screenshot
        await page.screenshot(path="landing_page_full.png", full_page=True)
        print("Screenshot saved to landing_page_full.png")
        await browser.close()

asyncio.run(run())
