import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import QuizSettingsPage from "./pages/QuizSettingsPage.tsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store.ts";
import QuizPage from "./pages/QuizPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/quiz-settings",
    element: <QuizSettingsPage />,
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
