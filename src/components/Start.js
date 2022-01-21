import React from "react";

export default function Start(props) {
  return (
    <div className="intro">
      <h1 className="intro__title">Quizzical</h1>
      <p className="intro__description">Test your knowledge</p>
      <button
        className="btn submit__btn"
        id="start__btn"
        type="button"
        onClick={() => {
          props.onBtnClick();
        }}
      >
        Start quizz
      </button>
    </div>
  );
}
