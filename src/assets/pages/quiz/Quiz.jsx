import "./Quiz.scss";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Page from "../../components/page/Page";
import Button from "../../components/button/Button";
import Questions from "../../components/quiz/Questions";
import Loader from "../../components/loader/Loader";

const Quiz = () => {
  const [isError, setIsError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const gameSettings = {
    numberOfQuestions: 5,
  };

  const fetchQuestions = () => {
    setIsLoading(true);
    const url = `https://opentdb.com/api.php?amount=${gameSettings.numberOfQuestions}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => {
        setQuestions(
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line
  }, []);

  const handleAnswer = (questionId, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((prevQuestion) =>
        prevQuestion.id === questionId
          ? { ...prevQuestion, selectedAnswer: answer }
          : prevQuestion
      )
    );
  };

  const countCorrectAnswers = () => {
    questions.forEach((question) => {
      if (question.selectedAnswer === question.correctAnswer) {
        setCorrectAnswers((prev) => prev + 1);
      }
    });
  };

  const checkIfQuestionsAnswered = questions.every(
    (question) => question.selectedAnswer !== null
  );

  const checkAnswers = () => {
    if (checkIfQuestionsAnswered) {
      countCorrectAnswers();
      setGameOver(true);
      setIsError(false);
    } else {
      document.querySelector(".quiz").scrollTo({ top: 0, behavior: "smooth" });
      setIsError(true);
    }
  };

  const startGame = () => {
    setCorrectAnswers(0);
    setGameOver(false);
    fetchQuestions();
  };

  return (
    <Page>
      <section className="quiz">
        {isError && <p className="quiz-error">All questions are required!</p>}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Questions
              questions={questions}
              gameOver={gameOver}
              handleAnswer={handleAnswer}
            />
            <div className="quiz-footer">
              {gameOver && (
                <p className="quiz-result">
                  You scored {correctAnswers}/{gameSettings.numberOfQuestions}{" "}
                  correct answers
                </p>
              )}
              <Button onClick={gameOver ? startGame : checkAnswers}>
                {gameOver ? "Play again" : "Check answers"}
              </Button>
            </div>
          </>
        )}
      </section>
    </Page>
  );
};

export default Quiz;
