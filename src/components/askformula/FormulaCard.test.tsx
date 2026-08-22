import { render, screen } from "@testing-library/react";
import FormulaCard from "./FormulaCard";
import katex from "katex";
import { vi } from "vitest";

describe("FormulaCard", () => {
  it("should render a valid formula correctly", () => {
    const validFormula = {
      id: "1",
      name: "Pythagorean Theorem",
      latex: "a^2 + b^2 = c^2",
      tags: ["math", "geometry"],
      chapter: "Triangles",
    };

    render(<FormulaCard formula={validFormula} />);

    // Check for the formula name
    expect(screen.getByText("Pythagorean Theorem")).toBeInTheDocument();

    // Check for the chapter tag
    expect(screen.getByText("Triangles")).toBeInTheDocument();

    // Check that katex rendered something (usually includes the 'katex-html' class in its output)
    const container = screen.getByText("Pythagorean Theorem").closest("div")?.parentElement;
    expect(container?.querySelector(".katex")).toBeInTheDocument();
  });

  it("should render a fallback code block for an invalid formula that throws error", () => {
    const invalidFormula = {
      id: "2",
      name: "Invalid Formula",
      latex: "\\invalidCommand",
      tags: ["error"],
      chapter: "Errors",
    };

    // To robustly test the catch block, we mock katex.renderToString to throw an error
    const spy = vi.spyOn(katex, "renderToString").mockImplementation(() => {
      throw new Error("Mock KaTeX error");
    });

    render(<FormulaCard formula={invalidFormula} />);

    // Check for the formula name
    expect(screen.getByText("Invalid Formula")).toBeInTheDocument();

    const fallbackElement = screen.getByText("\\invalidCommand");
    expect(fallbackElement).toBeInTheDocument();
    expect(fallbackElement.tagName.toLowerCase()).toBe("code");
    expect(fallbackElement).toHaveClass("text-sm font-mono");

    spy.mockRestore();
  });
});
