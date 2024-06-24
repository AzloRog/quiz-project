import { useAppSelector, useAppDispatch } from "../hooks";
import { setCards, createCard } from "../features/cards/cardsSlicer";

import { Link } from "react-router-dom";
import QuizSettingsCard from "../components/QuizSettingsCard";
import { useEffect, useRef } from "react";

const QuizSettingsPage = () => {
  const isMounted = useRef(false);
  const quizCards = useAppSelector((store) => store.cards);
  const dispatch = useAppDispatch();

  console.log(quizCards);
  useEffect(() => {
    if (quizCards.length <= 0) {
      const quizLocale = localStorage.getItem("quizCards");
      if (quizLocale) {
        console.log("get");
        const quizArray = JSON.parse(quizLocale);
        dispatch(setCards(quizArray));
      }
    }
  }, []);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    console.log("started");

    localStorage.setItem("quizCards", JSON.stringify(quizCards));
  }, [quizCards]);

  return (
    <div className="mb-16 ">
      <Link
        to="/"
        className="text-2xl sticky top-[10px] left-[20px] cursor-pointer py-2 px-4 hover:bg-red-500 hover:text-white transition-all"
      >
        X
      </Link>
      <ul className="mt-20 max-w-[820px] mx-auto flex flex-col gap-10 ">
        {quizCards.map((item) => (
          <li key={item.id}>
            <QuizSettingsCard
              cardId={item.id}
              question={item.question}
              answers={item.answers}
              type={item.type}
            />
          </li>
        ))}
      </ul>
      <button
        className="block mt-16 mx-auto py-2 px-16 border-[2px] border-gray-500 rounded-md hover:bg-gray-600 hover:text-white
         shadow-xl transition-all"
        onClick={() => dispatch(createCard())}
      >
        Добавить Карточку - Вопрос
      </button>
    </div>
  );
};

export default QuizSettingsPage;
