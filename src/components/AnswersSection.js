import { nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createAnswersList } from "../hepler/helper";

const AnswersSections = ({
  optionsList,
  setOptionsList,
  showAnimation,
  selectedAnswer,
  setSelectedAnswer,
}) => {
  const { triviaQuizList, resultsCollection } = useSelector(
    (state) => state.trivia
  );

  useEffect(() => {
    if (Object.keys(triviaQuizList).length > 0) {
      const newList = createAnswersList({
        options: triviaQuizList?.incorrect_answers,
        answer: triviaQuizList?.correct_answer,
      });
      setOptionsList(newList);
    }
  }, [triviaQuizList?.correct_answer]);
  const setAnimation = (cssClass, index, answer) => {
    return cssClass
      ? cssClass === "wrongAnswer"
        ? showAnimation
          ? cssClass + " errorShakeAnimation"
          : "wrongAnswer"
        : cssClass === "selectedRightAnswer"
        ? showAnimation
          ? cssClass + " bouncingAnimation"
          : "rightAnswer"
        : cssClass
      : selectedAnswer === index
      ? "selectedAnswer"
      : "";
  };
  return (
    <div className="answers-collection">
      {optionsList?.length > 0 &&
        optionsList?.map((item, index) => {
          return (
            <div
              className={"ans-cards " + setAnimation(item?.cssClass, index)}
              // onClick={() => setSelectedAnswer({ index })}
              onClick={() => {
                // selectAnswer(index);
                setSelectedAnswer(index);
              }}
              key={nanoid()}
            >
              {index + 1} {". "} {item?.answer}
            </div>
          );
        })}
    </div>
  );
};

export default AnswersSections;
