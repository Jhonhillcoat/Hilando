import { create } from "zustand";

import type { Answer } from "@/lib/quiz-logic";

type QuizState = {
  step: number;
  answers: Answer[];
  setAnswer: (questionId: number, optionId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  step: 0,
  answers: [],
  setAnswer: (questionId, optionId) =>
    set((s) => {
      const filtered = s.answers.filter((a) => a.questionId !== questionId);
      return { answers: [...filtered, { questionId, optionId }] };
    }),
  nextStep: () => set({ step: Math.min(4, get().step + 1) }),
  prevStep: () => set({ step: Math.max(0, get().step - 1) }),
  reset: () => set({ step: 0, answers: [] }),
}));
