import "./Answer.scss";

const Answer = ({ id, label, onClick, isActive }) => {
  return (
    <div
      className={isActive ? "quiz-answer active" : "quiz-answer"}
      onClick={() => onClick(id, label)}
    >
      {label}
    </div>
  );
};

export default Answer;
