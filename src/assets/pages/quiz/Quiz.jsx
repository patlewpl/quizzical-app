import { nanoid } from "nanoid";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Page from "../../components/page/Page";
import Answer from "../../components/quiz/Answer";
import "./Quiz.scss";

const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const settings = { numberOfQuestions: 5 };

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${settings.numberOfQuestions}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => {
        setQuizData(
          data.results.map((item) => ({
            id: nanoid(),
            question: item.question,
            answers: item.incorrect_answers
              .concat(item.correct_answer)
              .sort(() => Math.random() - 0.5),
            correctAnswer: item.correct_answer,
            selectedAnswer: null,
          }))
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleAnswer = (questionId, answer) => {
    setQuizData((prevQuizData) =>
      prevQuizData.map((item) =>
        item.id === questionId ? { ...item, selectedAnswer: answer } : item
      )
    );
  };

  const questions = quizData.map((item, index) => (
    <div className="quiz-item" key={index}>
      <h2>{decode(item.question)}</h2>
      {item.answers.map((answer) => (
        <Answer
          id={item.id}
          key={item.id}
          onClick={handleAnswer}
          label={decode(answer)}
          isActive={decode(answer) === item.selectedAnswer}
        />
      ))}
    </div>
  ));

  return (
    <Page>
      <section className="quiz">
        {questions}
        <div className="quiz-button">
          <Button>Check answers</Button>
        </div>
      </section>
    </Page>
  );
};

export default Quiz;
