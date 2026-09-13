import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Mock sessionStorage to force quiz options
        await page.goto("http://localhost:5173/quiz", wait_until="networkidle")

        # Navigate to a quiz with options
        await page.evaluate("""() => {
            sessionStorage.setItem('askformula-quiz-questions', JSON.stringify([
                {
                    "id": "ident_1",
                    "type": "formula_identification",
                    "text": "What is the formula for Force?",
                    "formulaId": "f_1",
                    "options": [
                        {"id": "correct", "latex": "F = ma"},
                        {"id": "distractor_0", "latex": "F = mc^2"},
                        {"id": "distractor_1", "latex": "F = \\frac{dp}{dt}"},
                        {"id": "distractor_2", "text": "None of the above"}
                    ],
                    "correctOptionId": "correct",
                    "explanation": "Newton's second law.",
                    "category": "Physics"
                }
            ]));
            sessionStorage.setItem('askformula-quiz-topics', JSON.stringify(["Physics"]));
        }""")

        # Reload to apply mocked state
        await page.goto("http://localhost:5173/quiz", wait_until="networkidle")

        # Let the page render
        await asyncio.sleep(2)

        # Take screenshot of the quiz
        await page.screenshot(path="active_quiz_verification.png")
        print("Verification screenshot saved to active_quiz_verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
