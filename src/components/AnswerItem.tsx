import { useAppSelector, useAppDispatch } from "../hooks";
import {
  addTargetAnswerId,
  setCardAnswer,
  deleteCardAnswer,
} from "../features/cards/cardsSlicer";
interface props {
  cardId: string;
  id: string;
  text: string;
  isTargetAnswer: boolean;
}

const AnswerItem = ({ cardId, id, text, isTargetAnswer }: props) => {
  const card = useAppSelector((state) =>
    state.cards.find((card) => card.id == cardId)
  );
  const answer = card!.answers.find((answer) => answer.id == id);

  const dispatch = useAppDispatch();

  const toggleTargetAnswer = (id: string, targetAnswerId: string) => {
    if (answer!.isTargetAnswer) {
      dispatch(addTargetAnswerId({ id, answerId: targetAnswerId }));
      return;
    }

    const targetAnswersCount = card!.answers.filter(
      (answer) => answer.isTargetAnswer
    ).length;

    switch (card!.type) {
      case "oneAnswer": {
        if (targetAnswersCount < 1) {
          dispatch(addTargetAnswerId({ id, answerId: targetAnswerId }));
        }
        break;
      }
      case "twoAnswers": {
        if (targetAnswersCount < 2) {
          dispatch(addTargetAnswerId({ id, answerId: targetAnswerId }));
        }
        break;
      }
      default: {
        return;
      }
    }
  };

  return (
    <div
      className={`flex gap-6 items-center py-2 px-2 shadow-md border-gray border-[1px] transition-all  ${
        isTargetAnswer && "border-green-400 outline-8"
      }`}
    >
      <button
        className=" px-2 py-1 rounded-md hover:bg-slate-500 hover:text-white transition-all"
        onClick={() => toggleTargetAnswer(cardId, id)}
      >
        Верно
      </button>
      <textarea
        className="flex-1 outline-none"
        onChange={(e) =>
          dispatch(
            setCardAnswer({ id: cardId, answerId: id, text: e.target.value })
          )
        }
        value={text}
        placeholder="Ответ"
      />
      <span
        className="cursor-pointer py-1 px-3 hover:bg-red-400 hover:text-white transition-all rounded-sm"
        onClick={() => dispatch(deleteCardAnswer({ id: cardId, answerId: id }))}
      >
        X
      </span>
    </div>
  );
};

export default AnswerItem;
