import React, { useState } from "react";

export default function Question(props) {
  return (
    <>
      <fieldset className="question">
        <legend dangerouslySetInnerHTML={{ __html: props.title }} className="question__title"></legend>
        <div className="question__btn-wrap">
          {props.answers.map((answer) => {
            const labelClasses = [
              "question__btn",
              props.value === answer ? "question__btn--checked" : "",
              props.correctAnswer === answer && props.revealCorrect ? "question__btn--correct" : "",
              props.value === answer && props.value !== props.correctAnswer && props.correctWrong ? "question__btn--wrong" : "",
              props.correctAnswer !== answer && props.muted ? "question__btn--muted" : "",
            ];
            return (
              <label className={labelClasses.join(" ")} key={answer}>
                <input type="radio" name={props.title} value={answer} onChange={props.handleChange}></input>
                {answer}
              </label>
            );
          })}
        </div>
      </fieldset>
    </>
  );
}
