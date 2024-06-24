import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="mt-24 px-4 flex justify-center">
      <div>
        <h1 className="text-6xl">Выберите действие</h1>
        <div className="mt-12 grid grid-cols-2 gap-6 text-center">
          <Link
            to="/quiz-settings"
            className="py-12 shadow-md shadow-black text-xl font-semibold"
          >
            Настроить тест
          </Link>
          <Link
            to="/quiz"
            className="py-12 shadow-md shadow-black text-xl font-semibold"
          >
            Начать тест
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
