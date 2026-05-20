import { create } from "zustand";

import type { Answer } from "@/lib/quiz-logic";

type QuizState = {
  step: number;
  answers: Answer[];
  inspirationFileName: string | null;
  setAnswer: (questionId: number, optionId: string) => void;
  setInspirationFile: (fileName: string | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  step: 0,
  answers: [],
  inspirationFileName: null,
  setAnswer: (questionId, optionId) =>
    set((s) => {
      const filtered = s.answers.filter((a) => a.questionId !== questionId);
      const next = { answers: [...filtered, { questionId, optionId }] };
      if (questionId === 5 && optionId !== "look-si") {
        return { ...next, inspirationFileName: null };
      }
      return next;
    }),
  setInspirationFile: (fileName) => set({ inspirationFileName: fileName }),
  nextStep: () => set({ step: Math.min(4, get().step + 1) }),
  prevStep: () => set({ step: Math.max(0, get().step - 1) }),
  reset: () => set({ step: 0, answers: [], inspirationFileName: null }),
}));
