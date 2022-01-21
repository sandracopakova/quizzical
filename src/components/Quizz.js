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
  //ukládá data
  const [formData, setFormData] = useState({});
  const [score, setScore] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
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
  }, []);
  const questionElements = questions.map((obj) => (
    <Question key={obj.title} value={formData[obj.title]} title={obj.title} answers={obj.answers} correctAnswer={obj.correctAnswer} handleChange={handleChange} />
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
        <button
          className="btn submit__btn"
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
      </div>
    </>
  );
}
