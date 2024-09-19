import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTriviaQuiz } from "../redux/triviaApi/triviaApi";
import { setTriviaLoading } from "../redux/triviaSlice/triviSlice";
import { toast } from "react-toastify";
import ControlButtons from "../components/ControlButtons";
import AnswersCollection from "../components/AnswersCollection";
import AnswersSections from "../components/AnswersSection";

const TriviaPage = ({
  setShowResult,
  showResult,
  questionCount,
  setQuestionCount,
}) => {
  const { triviaQuizList, resultsCollection } = useSelector(
    (state) => state.trivia
  );
  const [optionsList, setOptionsList] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState();

  const dispatch = useDispatch();
  const handleGenerateQuestion = async () => {
    setShowAnimation(false);
    const response = await dispatch(getTriviaQuiz());
    dispatch(setTriviaLoading(false));
    if (response?.payload?.status === 429) {
      toast.error("To many request please try after few seconds");
    } else {
      setQuestionCount(questionCount + 1);
    }
  };

  return (
    <div className="trivia-quiz-container">
      <h2>
        {questionCount === 0 ? "Start Trivia Questions" : "Trivia Question"}
      </h2>
      {questionCount === 0 ? (
        <div className="starting-btn">
          <button className="trivia-btns" onClick={handleGenerateQuestion}>
            Start Game
          </button>
        </div>
      ) : (
        <div className="questions-sections">
          <p className="question">
            {questionCount} {". "} {triviaQuizList?.question}
          </p>
          <AnswersSections
            optionsList={optionsList}
            setOptionsList={setOptionsList}
            showAnimation={showAnimation}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          />
          {typeof questionCount === "number" && questionCount <= 10 && (
            <ControlButtons
              // handleCheckRightAnswer={handleCheckRightAnswer}
              selectedAnswer={selectedAnswer}
              resultsCollectionLength={resultsCollection?.length}
              questionCount={questionCount}
              handleGenerateQuestion={handleGenerateQuestion}
              setQuestionCount={setQuestionCount}
              setSelectedAnswer={setSelectedAnswer}
              setShowResult={setShowResult}
              setShowAnimation={setShowAnimation}
              setOptionsList={setOptionsList}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TriviaPage;
