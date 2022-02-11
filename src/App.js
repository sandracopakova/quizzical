import React, { useState } from "react";
import Quizz from "./components/Quizz";
import Start from "./components/Start";

export default function App() {
  const [isIntro, setIsIntro] = useState(true);
  return isIntro ? (
    <Start
      onBtnClick={() => {
        setIsIntro(false);
      }}
    />
  ) : (
    <Quizz />
  );
}
