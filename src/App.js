import { useState } from "react";
import TriviaPage from "./modules/TriviaPage";
import "./utils/App.css";
import ResultPage from "./modules/ResultPage";
function App() {
  const [showResult, setShowResult] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  return (
    <div className="App">
      <div className="trivia-container">
        <h1 className="trivia-heading">Trivia Quiz Game</h1>
        {showResult ? (
          <ResultPage
            setQuestionCount={setQuestionCount}
            setShowResult={setShowResult}
          />
        ) : (
          <TriviaPage
            setShowResult={setShowResult}
            showResult={showResult}
            setQuestionCount={setQuestionCount}
            questionCount={questionCount}
          />
        )}
      </div>
    </div>
  );
}

export default App;
