import "./Answer.scss";

const Answer = ({ id, label, onClick, isActive, correctAnswer, gameOver }) => {
  const customClassName = `${isActive ? "quiz-answer active" : "quiz-answer"} ${
    gameOver && correctAnswer === label ? "correct" : ""
  } ${gameOver && isActive && correctAnswer !== label ? "incorrect" : ""} `;

  return (
    <div className={customClassName} onClick={() => onClick(id, label)}>
      {label}
    </div>
  );
};

export default Answer;
