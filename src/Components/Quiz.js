import classes from "./Quiz.module.css";
import { useState } from "react";
import Button from "./Button.js";
import Loading from "./Loading";

const Quiz = () => {
  const [startGame, setStartGame] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [position, setPosition] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [isCorrect, setisCorrect] = useState(false);
  const [isIncorrect, setisIncorrect] = useState(false);
  let i = 0;

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  const RaisePosition = () => {
    setPosition(position + 1);
    setisCorrect(false);
    setisIncorrect(false);
  };

  const ShuffleAnswers = () => {
    setAnswers(
      shuffle([
        questions[position + 1].correct_answer,
        ...questions[position + 1].incorrect_answers,
      ])
    );
  };

  const AnswerHandler = () => {
    setisLoading(true);
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQuestions(data.results);
        setisLoading(false);
        setStartGame(true);
        console.log("Success:", data);
        setAnswers(
          shuffle([
            data.results[position].correct_answer,
            ...data.results[position].incorrect_answers,
          ])
        );
      });
  };

  const skipHandler = () => {
    if (position < 9)
      setAnswers(
        shuffle([
          questions[position + 1].correct_answer,
          ...questions[position + 1].incorrect_answers,
        ])
      );

    setPosition(position + 1);
  };
  
  const CheckAnswerHandler = (event) => {
    if (event.target.value === questions[position].correct_answer) {
      setScore(score + 1);
      setisCorrect(true);
      if (position < 10) {
        setTimeout(RaisePosition, 2000);
      }
    } else {
      setScore(score - 0.5);
      setisIncorrect(true);
      if (position < 10) {
        setTimeout(RaisePosition, 2000);
      }
    }
    if (position < 9) setTimeout(ShuffleAnswers, 2000);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (position == 10) {
    return <h1>Your score is : {score} </h1>;
  }

  return (
    <div className={classes.quizdiv}>
      {!startGame && (
        <div className={classes.startdiv}>
          <button className={classes.startbtn} onClick={AnswerHandler}>
            Start Game
          </button>
        </div>
      )}
      {startGame && (
        <div className={classes.answers}>
          <div className={classes.questiondiv}>
            {" "}
            <h2
              className={classes.question}
              dangerouslySetInnerHTML={{ __html: questions[position].question }}
            />
          </div>
          {answers.map((answer) => (
            <Button
              className={
                (isCorrect && classes.correct) ||
                (isIncorrect && classes.incorrect) ||
                (!isCorrect && classes.answerbtn)
              }
              key={i++}
              value={answer}
              onClick={CheckAnswerHandler}
            >
              {answer}
            </Button>
          ))}
          <button className={classes.skipbtn} onClick={skipHandler}>
            Skip
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
