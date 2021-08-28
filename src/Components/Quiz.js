import classes from "./Quiz.module.css";
import { useState, useEffect } from "react";
import Button from "./Button.js";
import Loading from "./Loading";
import { NumberOfQuestions } from "./Endpoints/Endpoints";
import Dropdown from "./Dropdown";

const Quiz = () => {
  const [startGame, setStartGame] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [position, setPosition] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [isCorrect, setisCorrect] = useState(false);
  const [isIncorrect, setisIncorrect] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [URL, setURL] = useState("https://opentdb.com/api.php?amount=10");
  const [num, setNumber] = useState(10);
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => {
        return response.json();
      })
      .then((data2) => {
        setCategoryList(data2.trivia_categories);
        console.log(data2.trivia_categories);
        setCategoryLoading(false);
      });
  }, []);

  useEffect(() => {
    setURL("https://opentdb.com/api.php?amount=" + num + category);
  }, [URL, num, category]);

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
    setDisableButton(false);
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
    fetch(URL)
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
            data.results[0].correct_answer,
            ...data.results[0].incorrect_answers,
          ])
        );
      });
  };
  const Reset = () => {
    setQuestions([]);
    setAnswers([]);
    setisLoading(false);
    setisCorrect(false);
    setisIncorrect(false);
    setClicked(false);
  };
  if (position === num && clicked) {
    Reset();
  }
  const PlayAgainHandler = () => {
    setScore(0);
    setPosition(0);
    setClicked(true);
    AnswerHandler();
  };

  const skipHandler = () => {
    if (position < num - 1)
      setAnswers(
        shuffle([
          questions[position + 1].correct_answer,
          ...questions[position + 1].incorrect_answers,
        ])
      );
    setPosition(position + 1);
  };

  const CheckAnswerHandler = (event) => {
    setDisableButton(true);
    setCorrectAnswer(questions[position].correct_answer);
    setSelectedAnswer(event.target.value);
    if (event.target.value === questions[position].correct_answer) {
      setScore(score + 1);
      setisCorrect(true);
      if (position < num) {
        setTimeout(RaisePosition, 1000);
      }
    } else {
      setScore(score - 0.5);
      setisIncorrect(true);
      if (position < num) {
        setTimeout(RaisePosition, 1000);
      }
    }
    if (position < num - 1) setTimeout(ShuffleAnswers, 1000);
  };
  const ChoiceHandler = (event) => {
    if (event.target.id === "category") {
      setCategory("&category=" + event.target.value);
      console.log(category);
      console.log(URL);
    }
    if (event.target.id === "numberofquestions") {
      setNumber(event.target.value);
      console.log(num);
      console.log(URL);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (position == num) {
    return (
      <div className={classes.scorediv}>
        <h1>Your score is : {score} </h1>
        <button className={classes.playagainbtn} onClick={PlayAgainHandler}>
          Play again
        </button>
      </div>
    );
  }

  return (
    <div className={classes.quizdiv}>
      {!startGame && (
        <div className={classes.startdiv}>
          <button className={classes.startbtn} onClick={AnswerHandler}>
            Start Game
          </button>
          <label for="category" className={classes.categorylbl}>
            Choose a category :
          </label>
          {categoryLoading ? (
            <Loading className1="categoryloader" className2="categoryloader2" />
          ) : (
            <Dropdown
              onChange={ChoiceHandler}
              id="category"
              pick={categoryList}
            />
          )}
          <label for="numberofquestions" className={classes.numberlbl}>
            Number of questions :
          </label>
          <Dropdown
            onChange={ChoiceHandler}
            id="numberofquestions"
            pick={NumberOfQuestions}
          />
        </div>
      )}
      {startGame && (
        <div className={classes.answers}>
          <div className={classes.questiondiv}>
            <h2
              className={classes.question}
              dangerouslySetInnerHTML={{ __html: questions[position].question }}
            />
          </div>
          {answers.map((answer, i) => (
            <Button
              disabled={disableButton}
              className={
                (selectedAnswer === answer &&
                  selectedAnswer === correctAnswer &&
                  isCorrect &&
                  classes.correct) ||
                (selectedAnswer === answer &&
                  selectedAnswer !== correctAnswer &&
                  isIncorrect &&
                  classes.incorrect) ||
                (answer === correctAnswer && isIncorrect && classes.correct) ||
                classes.answerbtn
              }
              key={i++}
              value={answer}
              onClick={CheckAnswerHandler}
            >
              {answer}
            </Button>
          ))}
          <button
            disabled={disableButton}
            className={classes.skipbtn}
            onClick={skipHandler}
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
