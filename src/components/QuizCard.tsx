import { useState } from "react";
import type { quizCardType } from "../features/cards/cardsSlicer";

interface props {
  onNextCard: any;
  question: string;
  answers: { id: string; text: string; isTargetAnswer: boolean }[];
  type: quizCardType;
}
const QuizCard = ({ onNextCard, question, answers, type }: props) => {
  const [selectedAnswersId, setSelectedAnswersId] = useState<string[]>([]);

  const handleSelectAnswer = (id: string) => {
    const existAnswer = selectedAnswersId.find((answerId) => answerId == id);
    if (existAnswer) {
      setSelectedAnswersId((prevState) =>
        prevState.filter((answer) => answer != id)
      );
      return;
    }
    switch (type) {
      case "oneAnswer": {
        if (selectedAnswersId.length < 1) {
          setSelectedAnswersId((prevState) => [...prevState, id]);
        }
        break;
      }
      case "twoAnswers": {
        if (selectedAnswersId.length < 2) {
          console.log("OKEY");

          setSelectedAnswersId((prevState) => [...prevState, id]);
        }
      }
    }
  };
  const handleSubmitAnswers = () => {
    if (selectedAnswersId.length == 0) {
      onNextCard(false);
      return;
    }
    const targetAnswers = answers.filter((answer) => answer.isTargetAnswer);
    const answersId = targetAnswers
      .map((targetAnswer) => targetAnswer.id)
      .sort();
    const isEqualLength = answersId.length == selectedAnswersId.length;
    const isEqual =
      isEqualLength &&
      selectedAnswersId
        .slice()
        .sort()
        .every(
          (selectedAnswerId, index) => selectedAnswerId == answersId[index]
        );
    onNextCard(isEqual);
  };

  return (
    <div className="py-12 px-10 flex-1 max-w-[680px] shadow-xl border-gray-200 border-[1px] ">
      <h2 className="text-2xl">{question}</h2>
      <ul className="text-lg mt-10 pl-4 flex flex-col gap-6">
        {type == "oneAnswer" || type == "twoAnswers" ? (
          answers.map((answer) => (
            <li
              onClick={() => handleSelectAnswer(answer.id)}
              key={answer.id}
              className={`rounded-md p-4 transition-all cursor-pointer hover:bg-slate-300   ${
                selectedAnswersId.includes(answer.id)
                  ? "outline outline-2 outline-green-400  "
                  : ""
              }`}
            >
              {answer.text}
            </li>
          ))
        ) : (
          <textarea
            placeholder="Ответ"
            className="py-2 px-4 border-slate-400 border-[1px] rounded-md"
          />
        )}
      </ul>
      <div className="mt-6 flex justify-end text-xl">
        <button
          onClick={() => handleSubmitAnswers()}
          className="border-slate-500  border-[2px] p-2 rounded-md hover:bg-slate-600 hover:text-white transition-all"
        >
          След вопрос
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
