import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useQuizEngine } from "./useQuizEngine";

describe("useQuizEngine", () => {
  it("should generate a quiz of requested length", () => {
    const { result } = renderHook(() => useQuizEngine());

    let quiz: import('./useQuizEngine').QuizQuestion[] = [];
    act(() => {
      quiz = result.current.generateQuiz(5);
    });

    expect(quiz).toHaveLength(5);
    expect(quiz[0]).toHaveProperty("id");
    expect(quiz[0]).toHaveProperty("type");
    expect(quiz[0]).toHaveProperty("text");
    expect(quiz[0]).toHaveProperty("options");
    expect(quiz[0].options.length).toBe(4);
    expect(quiz[0]).toHaveProperty("correctOptionId");
  });
});
