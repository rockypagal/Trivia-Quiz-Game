import { nanoid } from "@reduxjs/toolkit";

const AnswersCollection = ({ resultsCollection, handleGenerateQuestion }) => {
  return (
    <div className="answers-collection">
      {resultsCollection?.length > 0 &&
        resultsCollection?.map((item, index) => {
          const { wasSelectedAnswerRight, questionCount, question, answer } =
            item;

          return (
            <div
              className={
                "ans-cards flex-direction " +
                (wasSelectedAnswerRight ? "rightAnswer" : "wrongAnswer")
              }
              key={nanoid()}
            >
              {questionCount} {". "} {question}
              <p>Answer: {answer}</p>
            </div>
          );
        })}
      <div className="starting-btn">
        <button className="trivia-btns" onClick={handleGenerateQuestion}>
          Start Again
        </button>
      </div>
    </div>
  );
};
export default AnswersCollection;
