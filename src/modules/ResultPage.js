import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTriviaQuiz } from "../redux/triviaApi/triviaApi";
import { setResultCollection } from "../redux/triviaSlice/triviSlice";
import Loader from "../components/Loader";
import AnswersCollection from "../components/AnswersCollection";

const ResultPage = ({ setQuestionCount, setShowResult }) => {
  const { resultsCollection, triviaLoading } = useSelector(
    (store) => store.trivia
  );

  const [totalScore, setTotalScore] = useState(0);
  const dispatch = useDispatch();

  const handleGenerateQuestion = async () => {
    await dispatch(setResultCollection([]));
    await dispatch(getTriviaQuiz());
    setQuestionCount(1);
    setShowResult(false);
  };

  useEffect(() => {
    if (resultsCollection.length > 0) {
      let total = resultsCollection?.reduce((accumulator, item) => {
        if (item?.wasSelectedAnswerRight) {
          accumulator += 1;
        }
        return accumulator;
      }, 0);

      setTotalScore(total);
    }
  }, [resultsCollection]);
  return (
    <div className="trivia-quiz-container">
      <h2>Trivia Results</h2>
      {triviaLoading ? (
        <Loader isLoading={triviaLoading} />
      ) : (
        <>
          <p className="total-score">
            Total Score: {totalScore}/{resultsCollection?.length}
          </p>
          <AnswersCollection
            resultsCollection={resultsCollection}
            handleGenerateQuestion={handleGenerateQuestion}
          />
        </>
      )}
    </div>
  );
};

export default ResultPage;
