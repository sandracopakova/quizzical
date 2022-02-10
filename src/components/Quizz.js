import React, { useEffect, useState } from "react";
import Question from "./Question";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export default function Quizz() {
  const [formData, setFormData] = useState({}); //data
  const [score, setScore] = useState(null); //počet správných odpovědí
  const [questions, setQuestions] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function fetchNewData() {
    return fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(
          data.results.map((apiQuestion) => {
            const answers = [...apiQuestion.incorrect_answers, apiQuestion.correct_answer];
            shuffleArray(answers);
            return {
              title: apiQuestion.question,
              answers,
              correctAnswer: apiQuestion.correct_answer,
            };
          })
        );
      });
  }

  useEffect(() => {
    fetchNewData();
  }, []);
  const questionElements = questions.map((obj) => (
    <Question
      key={obj.title}
      revealCorrect={score !== null}
      correctWrong={score !== null}
      muted={score !== null}
      value={formData[obj.title]}
      title={obj.title}
      answers={obj.answers}
      correctAnswer={obj.correctAnswer}
      handleChange={handleChange}
    />
  ));
  console.table(formData);
  return (
    <>
      <form>{questionElements}</form>
      <div className="form__footer">
        {score !== null && (
          <div>
            You scored {score}/{questions.length} correct answers
          </div>
        )}
        {score === null ? (
          <button
            className="btn btn--submit"
            //počet správných odpovědí
            onClick={() => {
              let correctAnswers = 0;
              questions.forEach((question) => {
                const userAnswer = formData[question.title];
                if (question.correctAnswer === userAnswer) {
                  correctAnswers++;
                }
              });
              setScore(correctAnswers);
            }}
          >
            Check answers
          </button>
        ) : (
          <button
            className="btn btn--submit"
            onClick={() => {
              fetchNewData().then(() => {
                setScore(null);
                setFormData({});
              });
            }}
          >
            Play again
          </button>
        )}
      </div>
    </>
  );
}
