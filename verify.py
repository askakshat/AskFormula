from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    # Check if dev server is running
    import urllib.request
    try:
        urllib.request.urlopen('http://localhost:5173')
        print("Dev server running")
    except:
        print("Starting dev server...")
        import subprocess
        import time
        server = subprocess.Popen(["bun", "run", "dev"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        time.sleep(5)

    try:
        page.goto("http://localhost:5173/quiz")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="docs_quiz/verify_dashboard.png")
        print("Captured dashboard screenshot")

        page.click("text=Start Practice Session")
        page.wait_for_load_state("networkidle")
        page.screenshot(path="docs_quiz/verify_active.png")
        print("Captured active quiz screenshot")

    finally:
        browser.close()
        try:
            server.terminate()
        except:
            pass
