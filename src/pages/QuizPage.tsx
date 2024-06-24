import QuizCard from "../components/QuizCard";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../hooks";
import { setCards } from "../features/cards/cardsSlicer";
const QuizPage = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const isMounted = useRef(false);

  const dispatch = useAppDispatch();
  const quizCards = useAppSelector((store) => store.cards);
  const targetCard = quizCards[currentCardIndex];

  const [correctCardsCount, setCorrectCardsCount] = useState<number>(0);
  console.log(currentCardIndex);
  const checkAndNextQuestion = (isCorrectAnswers: boolean) => {
    if (isCorrectAnswers) {
      setCorrectCardsCount((prevState) => prevState + 1);
    }
    setCurrentCardIndex((prevState) => prevState + 1);
  };

  useEffect(() => {
    if (quizCards.length <= 0) {
      const quizLocale = localStorage.getItem("quizCards");
      if (quizLocale) {
        const quizArray = JSON.parse(quizLocale);
        dispatch(setCards(quizArray));

        const currLocal = localStorage.getItem("currCardIndex");
        const corrLocal = localStorage.getItem("corrCardCount");
        if (currLocal && corrLocal) {
          const curr2 = JSON.parse(currLocal);
          setCurrentCardIndex(curr2);

          const corr2 = JSON.parse(corrLocal);
          setCorrectCardsCount(corr2);
          console.log("get");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    const currentJson = JSON.stringify(currentCardIndex);
    localStorage.setItem("currCardIndex", currentJson);

    const correctJson = JSON.stringify(correctCardsCount);
    localStorage.setItem("corrCardCount", correctJson);

    console.log("set");
  }, [currentCardIndex]);

  if (!quizCards.length) {
    return (
      <div className="min-h-[100vh] flex flex-col items-center justify-center text-center text-4xl">
        <h1 className="">
          Нет ни одной Карточки-вопроса, создайте карточку вопрос.
        </h1>
        <Link
          to="/quiz-settings"
          className="text-2xl mt-8 py-2 px-4 rounded-lg  border-slate-400 border-2 hover:bg-slate-600 
            hover:text-white transition-all"
        >
          Создать
        </Link>
      </div>
    );
  } else if (currentCardIndex >= quizCards.length) {
    const cardsCount = quizCards.filter(
      (card) => card.type == "oneAnswer" || card.type == "twoAnswers"
    ).length;

    return (
      <div className="min-h-[100vh] flex flex-col gap-8 items-center justify-center text-center text-4xl">
        <h1 className="">
          Верных ответов: {correctCardsCount} из {cardsCount}, <br />{" "}
          развернутые ответы находятся на проверке
        </h1>
        <button
          className="border-slate-500  border-[2px] p-2 rounded-md hover:bg-slate-600 hover:text-white transition-all"
          onClick={() => {
            setCorrectCardsCount(0);
            setCurrentCardIndex(0);
          }}
        >
          Начать заново
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] flex items-center justify-center">
      <QuizCard
        key={targetCard.id}
        {...targetCard}
        onNextCard={checkAndNextQuestion}
      />
    </div>
  );
};

export default QuizPage;
