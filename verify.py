from playwright.sync_api import sync_playwright
import urllib.request
import subprocess
import time

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    server = None
    try:
        urllib.request.urlopen('http://localhost:5173')
        print("Dev server running")
    except:
        print("Starting dev server...")
        server = subprocess.Popen(["bun", "run", "dev"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        time.sleep(5)

    try:
        page.goto("http://localhost:5173/quiz")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="docs_quiz/verify_dashboard_new.png")
        print("Captured dashboard screenshot")

        # Select first chapter checkbox
        page.click("text=Units and Measurements")

        page.click("text=Start Practice Session")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="docs_quiz/verify_active_new.png")
        print("Captured active quiz screenshot")

    finally:
        browser.close()
        if server:
            try:
                server.terminate()
            except:
                pass
