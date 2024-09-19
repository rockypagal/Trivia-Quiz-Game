import { configureStore } from "@reduxjs/toolkit";
import triviaSlice from "./triviaSlice/triviSlice";

const store = configureStore({
  reducer: {
    trivia: triviaSlice,
  },
});

export default store;
