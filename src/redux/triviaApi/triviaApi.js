import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTriviaQuiz = createAsyncThunk(
  "get/trivia-quiz",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&type=multiple",
      });

      if (response.status === 200) {
        return fulfillWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
