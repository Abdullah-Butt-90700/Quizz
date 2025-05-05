import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Answer {
  question: string; //question
  questionId: number; //question number
  answer: string | null; //user selected answers
  correctAnswers: string; //all correct answers
}
interface AnswerState {
  answers: Answer[];
}

const initialState: AnswerState = {
  answers: [],
};

const QuizzSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    saveAnswer: (state, action: PayloadAction<Answer>) => {
      state.answers.push(action.payload);
    },
  },
});

export const { saveAnswer } = QuizzSlice.actions;

export default QuizzSlice.reducer;
