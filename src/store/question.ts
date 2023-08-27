import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist, devtools } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,

          fetchQuestions: async (limit: number) => {
            const res = await fetch("http://localhost:5173/data.json");
            const json = await res.json();

            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit);
            set({ questions }, false, "FETCH_QUESTIONS");
          },

          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get();
            //usear el structuredCLone para clonar el objeto de forma profunda
            const newQuestions = structuredClone(questions);
            //encontramos el indice de la pregunta
            const questionIndex = newQuestions.findIndex(
              (q) => q.id === questionId
            );
            //obtenemos la informacion de la pregunta
            const questionInfo = newQuestions[questionIndex];
            //averiguamos si es usuario a seleccion la respuesta correcta
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex;
            if (isCorrectUserAnswer) confetti();
            //cambiar esta informacion en la copia de la pregunta
            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
            };
            //Acutalizamos el estado
            set({ questions: newQuestions }, false, "SELECT_ANSWER");
          },

          goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions.length) {
              set(
                { currentQuestion: nextQuestion },
                false,
                "GO_NEXT_QUESTIONS"
              );
            }
          },

          goPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;

            if (previousQuestion >= 0) {
              set(
                { currentQuestion: previousQuestion },
                false,
                "GO_PREVIOUS_QUESTIONS"
              );
            }
          },

          reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, "RESET_GAME");
          },
        };
      },
      { name: "questions" }
    )
  )
);
