import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import PDFButton from "./PDFButton";
import { generatePDF } from "@/lib/pdf-generator";

vi.mock("@/lib/pdf-generator", () => ({
  generatePDF: vi.fn(),
}));

describe("PDFButton Error Path", () => {
  const mockFormulas = [
    { id: "1", name: "Test Formula", latex: "E=mc^2" },
  ];
  const mockSubject = "Physics";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("handles PDF generation errors properly and resets state", async () => {
    // We need to control when the promise rejects so we can test the intermediate loading state
    let rejectPromise: (reason?: Error) => void;
    const generatePromise = new Promise((_, reject) => {
      rejectPromise = reject;
    });

    vi.mocked(generatePDF).mockReturnValue(generatePromise as never);

    // Spy on console.error
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Render the component
    render(<PDFButton formulas={mockFormulas} subject={mockSubject} />);

    const button = screen.getByRole("button", { name: /Download PDF/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    // Setup user event
    const user = userEvent.setup();

    // Click the download button to open dropdown menu
    await user.click(button);

    // Click layout option
    const compactOption = screen.getByText(/Compact Layout/i);
    await user.click(compactOption);

    // Verify loading state appears
    expect(screen.getByRole("button", { name: /Building PDF/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Building PDF/i })).toBeDisabled();

    // Now trigger the error
    const mockError = new Error("Generation failed");
    rejectPromise!(mockError);

    // Wait for the async operation to complete
    await waitFor(() => {
      // Button should return to original state
      expect(screen.getByRole("button", { name: /Download PDF/i })).toBeInTheDocument();
    });

    // Verify the error was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith("PDF generation failed:", mockError);

    // Verify the button is enabled again
    expect(screen.getByRole("button", { name: /Download PDF/i })).not.toBeDisabled();
  });

  it("handles successful PDF generation properly", async () => {
    let resolvePromise: (value?: void) => void;
    const generatePromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    vi.mocked(generatePDF).mockReturnValue(generatePromise as never);

    render(<PDFButton formulas={mockFormulas} subject={mockSubject} />);
    const button = screen.getByRole("button", { name: /Download PDF/i });

    const user = userEvent.setup();
    await user.click(button);

    // Click layout option
    const compactOption = screen.getByText(/Compact Layout/i);
    await user.click(compactOption);

    // Verify loading state appears
    expect(screen.getByRole("button", { name: /Building PDF/i })).toBeInTheDocument();

    // Trigger success
    resolvePromise!();

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Download PDF/i })).toBeInTheDocument();
    });

    expect(generatePDF).toHaveBeenCalledWith(mockFormulas, mockSubject, "compact");
    expect(screen.getByRole("button", { name: /Download PDF/i })).not.toBeDisabled();
  });
});
