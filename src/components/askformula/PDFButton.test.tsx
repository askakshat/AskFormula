
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PDFButton from "./PDFButton";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    loading: vi.fn(() => "toast-id"),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockFormulas = [
  { id: "1", name: "Force", latex: "F = ma", chapter: "Mechanics" },
];
const mockSubject = "Physics";

describe("PDFButton Export Path", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    global.window.open = vi.fn();
  });

  it("handles successful PDF preparation properly", async () => {
    render(<PDFButton formulas={mockFormulas} subject={mockSubject} />);
    const button = screen.getByRole("button", { name: /Export to PDF/i });

    const user = userEvent.setup();
    await user.click(button);

    const compactOption = screen.getByRole("menuitem", {
      name: /Compact/i,
    });
    await user.click(compactOption);

    // Verify loading toast
    expect(toast.loading).toHaveBeenCalledWith(
      expect.stringContaining("Preparing compact PDF layout"),
      expect.any(Object)
    );

    // Verify session storage
    const stored = JSON.parse(sessionStorage.getItem("askformula-print-data") || "{}");
    expect(stored.subject).toBe("Physics");
    expect(stored.layout).toBe("compact");
    expect(stored.formulas.length).toBe(1);

    // Verify window open
    expect(window.open).toHaveBeenCalledWith("/print", "_blank");

    // Verify success toast
    expect(toast.success).toHaveBeenCalledWith(
      "Print view ready!",
      expect.any(Object)
    );
  });
});
