import React, { useState } from "react";

export default function Question(props) {
  return (
    <>
      <fieldset className="question">
        <legend dangerouslySetInnerHTML={{ __html: props.title }} className="question__title"></legend>
        <div className="question__btn-wrap">
          {props.answers.map((answer) => (
            <label className={`question__btn ${props.value === answer ? "question__btn--checked" : ""}`} key={answer}>
              <input type="radio" name={props.title} value={answer} onChange={props.handleChange}></input>
              {answer}
            </label>
          ))}
        </div>
      </fieldset>
    </>
  );
}
