import "./Questions.scss";
import Answer from "./Answer";
import { decode } from "html-entities";

const Questions = ({ questions, gameOver, handleAnswer }) => {
  if (!questions.length) {
    return (
      <h1 style={{ margin: "20px", textAlign: "center" }}>
        Questions not found. <br />
        Please change game settings.
      </h1>
    );
  }
  return questions.map((question, questionIndex) => (
    <div key={questionIndex} className="quiz-question">
      <h2>{decode(question.question)}</h2>
      {question.answers.map((answer, answerIndex) => (
        <Answer
          id={question.id}
          key={answerIndex}
          gameOver={gameOver}
          label={decode(answer)}
          onClick={handleAnswer}
          correctAnswer={question.correctAnswer}
          selectedAnswer={question.selectedAnswer}
          isActive={decode(answer) === question.selectedAnswer}
        />
      ))}
    </div>
  ));
};

export default Questions;
