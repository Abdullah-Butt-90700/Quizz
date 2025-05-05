import { configureStore } from "@reduxjs/toolkit";
import UserInfo from "./userSlice";
import QuizzSlice from "./QuizSlice";

const store = configureStore({
  reducer: {
    from: UserInfo,
    quizz: QuizzSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
