import { renderHook } from '@testing-library/react';
import { useQuizEngine } from './useQuizEngine';

describe('useQuizEngine', () => {
    it('generates a quiz of requested length', () => {
        const { result } = renderHook(() => useQuizEngine());
        const quiz = result.current.generateQuiz(5);
        expect(quiz.length).toBe(5);
        expect(quiz[0]).toHaveProperty('id');
        expect(quiz[0]).toHaveProperty('text');
        expect(quiz[0]).toHaveProperty('options');
        expect(quiz[0].options.length).toBeGreaterThanOrEqual(4);
    });
});
