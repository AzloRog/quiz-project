import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

interface quizCard {
  id: string;
  type: quizCardType;
  question: string;
  answers: { id: string; text: string; isTargetAnswer: boolean }[];
  targetAnswersId: string[];
}
export type quizCardType =
  | "oneAnswer"
  | "twoAnswers"
  | "shortAnswer"
  | "longAnswer";

const initialState: quizCard[] = [];

const cardsSlicer = createSlice({
  name: "cards",
  initialState: initialState,
  reducers: {
    setCards: (state, action: PayloadAction<quizCard[]>) => {
      state.splice(0, state.length);
      state.push(...action.payload);
    },

    createCard: (state) => {
      const id = nanoid();

      const newCard: quizCard = {
        id,
        type: "oneAnswer",
        question: "",
        answers: [],
        targetAnswersId: [],
      };
      state.push(newCard);
    },

    deleteCard: (state, action: PayloadAction<string>) => {
      const cardIndex = findIndexById(state, action.payload);

      state.splice(cardIndex, 1);
    },

    setCardQuestion: (
      state,
      action: PayloadAction<{ id: string; question: string }>
    ) => {
      const { id, question } = action.payload;
      const card = state.find((card) => card.id == id);

      card!.question = question;
    },

    setCardType: (
      state,
      action: PayloadAction<{ id: string; type: quizCardType }>
    ) => {
      const { id, type } = action.payload;
      const card = state.find((card) => card.id == id);
      card!.type = type;
    },

    createCardAnswer: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      const card = state.find((card) => card.id == cardId);

      const id = nanoid();
      const newAnswer = { id, text: "", isTargetAnswer: false };
      card!.answers.push(newAnswer);
    },

    deleteCardAnswer: (
      state,
      action: PayloadAction<{ id: string; answerId: string }>
    ) => {
      const { id, answerId } = action.payload;

      const card = state.find((card) => card.id == id);
      const answerIndex = findIndexById(card!.answers, answerId);
      card!.answers.splice(answerIndex, 1);
    },

    addTargetAnswerId: (
      state,
      action: PayloadAction<{ id: string; answerId: string }>
    ) => {
      console.log("OK");
      const card = state.find((card) => card.id == action.payload.id);
      const answer = card!.answers.find(
        (answer) => answer.id == action.payload.answerId
      );
      answer!.isTargetAnswer = !answer!.isTargetAnswer;
      // const { id, targetAnswerId } = action.payload;
      // console.log("OK");
      // const card = state.find((card) => card.id == id);
      // card!.targetAnswersId.push(targetAnswerId);
    },

    deleteTargetAnswerId: (
      state,
      action: PayloadAction<{ id: string; targetAnswerId: string }>
    ) => {
      const { id, targetAnswerId } = action.payload;

      const card = state.find((card) => card.id == id);
      const targetAnswerIndex = card!.targetAnswersId.findIndex(
        (targetAnswerItem) => targetAnswerItem == targetAnswerId
      );
      card!.targetAnswersId.splice(targetAnswerIndex, 1);
    },

    setCardAnswer: (
      state,
      action: PayloadAction<{ id: string; answerId: string; text: string }>
    ) => {
      const { id, answerId, text } = action.payload;

      const card = state.find((card) => card.id == id);
      const answer = card!.answers.find((answer) => answer.id == answerId);

      answer!.text = text;
    },
  },
});

const findIndexById = (array: { id: string }[], id: string): number => {
  return array.findIndex((item) => item.id == id);
};
export const {
  setCards,
  createCard,
  deleteCard,
  setCardQuestion,
  setCardType,
  deleteTargetAnswerId,
  addTargetAnswerId,
  createCardAnswer,
  deleteCardAnswer,
  setCardAnswer,
} = cardsSlicer.actions;
export default cardsSlicer.reducer;
