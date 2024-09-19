import { useDispatch, useSelector } from "react-redux";
import { deepClone } from "../hepler/helper";
import { setResultCollection } from "../redux/triviaSlice/triviSlice";

const ControlButtons = ({
  // handleCheckRightAnswer,
  selectedAnswer,
  resultsCollectionLength,
  questionCount,
  handleGenerateQuestion,
  setShowAnimation,
  setOptionsList,
  setQuestionCount,
  setSelectedAnswer,
  setShowResult,
}) => {
  const dispatch = useDispatch();
  const { triviaQuizList } = useSelector((state) => state.trivia);
  const handleCheckRightAnswer = async () => {
    setShowAnimation(true);
    let isAnswerRight = false;
    await setOptionsList((oldValues) => {
      let newValues = deepClone(oldValues);

      newValues = newValues.map((item, i) => {
        const { answer } = item;

        if (selectedAnswer === i && answer !== triviaQuizList?.correct_answer) {
          return { answer, cssClass: "wrongAnswer" };
        } else if (
          selectedAnswer === i &&
          answer === triviaQuizList?.correct_answer
        ) {
          isAnswerRight = true;

          return { answer, cssClass: "selectedRightAnswer" };
        } else if (answer === triviaQuizList?.correct_answer) {
          return { answer, cssClass: "rightAnswer" };
        } else {
          return { answer, cssClass: "wrongAnswerTwo" };
        }
      });
      return newValues;
    });

    dispatch(
      setResultCollection({
        questionCount,
        question: triviaQuizList?.question,
        answer: triviaQuizList?.correct_answer,
        wasSelectedAnswerRight: isAnswerRight,
      })
    );
    setSelectedAnswer(undefined);
    if (questionCount === 10) {
      setQuestionCount('10');
      setTimeout(() => {
        setShowResult(true);
      }, 1500);
    }
  };
  return (
    <div className="btn-container">
      <button
        className="trivia-btns"
        onClick={() => {
          handleCheckRightAnswer();
        }}
        disabled={selectedAnswer >= 0 ? false : true}
      >
        Submit
      </button>{" "}
      {questionCount === resultsCollectionLength && (
        <button className="trivia-btns" onClick={handleGenerateQuestion}>
          Next Quiz
        </button>
      )}
    </div>
  );
};

export default ControlButtons;
