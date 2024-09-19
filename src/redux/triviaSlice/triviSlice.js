import { createSlice } from "@reduxjs/toolkit";
import { getTriviaQuiz } from "../triviaApi/triviaApi";

const triviaSlice = createSlice({
  name: "trivia",
  initialState: {
    triviaLoading: false,
    triviaQuizList: [],
    resultsCollection: [],
  },

  reducers: {
    setTriviaLoading: (state, { payload }) => {
      state.triviaLoading = payload;
    },
    setResultCollection: (state, { payload }) => {
      state.resultsCollection = payload?.answer
        ? [...state.resultsCollection, payload]
        : payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTriviaQuiz.pending, (state) => {
      state.triviaLoading = true;
    });

    builder.addCase(getTriviaQuiz.fulfilled, (state, { payload }) => {
      state.triviaQuizList =
        payload && payload?.results[0] ? payload?.results[0] : {};
    });

    builder.addCase(getTriviaQuiz.rejected, (state) => {
      state.triviaLoading = false;
    });
  },
});

export const { setTriviaLoading, setResultCollection } = triviaSlice.actions;
export default triviaSlice.reducer;
