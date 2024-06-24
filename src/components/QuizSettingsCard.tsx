import { useAppDispatch } from "../hooks";
import {
  deleteCard,
  createCardAnswer,
  setCardType,
  setCardQuestion,
} from "../features/cards/cardsSlicer";
import AnswerItem from "./AnswerItem";

interface props {
  cardId: string;
  type: quizCardType;
  question: string;
  answers: { id: string; text: string; isTargetAnswer: boolean }[];
}
type quizCardType = "oneAnswer" | "twoAnswers" | "shortAnswer" | "longAnswer";

const QuizSettingsCard = ({ cardId, type, question, answers }: props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="relative py-8 px-16 shadow-xl">
      <h2 className="text-4xl font-semibold">Карточка вопрос</h2>
      <span
        className="absolute top-[20px] right-[20px] cursor-pointer py-2 px-4 hover:bg-red-500 hover:text-white transition-all "
        onClick={() => dispatch(deleteCard(cardId))}
      >
        X
      </span>
      <div className="mt-8 ml-8 flex gap-8 items-center">
        <h2 className="text-xl">Тип карточки-вопроса:</h2>
        <select
          className="text-lg py-2 px-4 hover:bg-gray-200  transition-all rounded-md cursor-pointer"
          value={type}
          onChange={(e) =>
            dispatch(
              setCardType({ id: cardId, type: e.target.value as quizCardType })
            )
          }
        >
          <option value="oneAnswer">Один ответ</option>
          <option value="twoAnswers">Два ответа</option>
          <option value="shortAnswer">Короткий ответ</option>
          <option value="longAnswer">Длинный ответ</option>
        </select>
      </div>
      <div className="ml-8 ">
        <h2 className="text-2xl font-semibold">Вопрос:</h2>
        <textarea
          className="p-3 mt-6 w-full border-gray-300 border-[2px] rounded-md"
          onChange={(e) =>
            dispatch(setCardQuestion({ id: cardId, question: e.target.value }))
          }
          value={question}
        ></textarea>
      </div>
      {(type == "oneAnswer" || type == "twoAnswers") && (
        <div>
          <div className="mt-8 ml-8">
            <h2 className="text-2xl font-semibold">Ответы:</h2>

            <ul className="mt-8 flex flex-col gap-6">
              {answers.map((answer) => (
                <AnswerItem
                  key={answer.id}
                  cardId={cardId}
                  id={answer.id}
                  text={answer.text}
                  isTargetAnswer={answer.isTargetAnswer}
                />
              ))}
            </ul>
          </div>
          <button
            className="text-lg mt-10 py-3 px-8 block mx-auto shadow-xl border-gray-400 border-[1px] rounded-md hover:bg-slate-500 hover:text-white transition-all"
            onClick={() => dispatch(createCardAnswer(cardId))}
          >
            Добавить ответ
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizSettingsCard;
