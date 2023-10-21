import React from "react";
import ReactDOM from "react-dom/client";
import Jobs from "./pages/jobs";
import Root from "./pages/root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./services/store/store";
import { Provider } from "react-redux";
import { worker } from "./mocks/browser.js";
import "./index.css";
import OverView, { loader } from "./pages/overview";

const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Jobs /> },
      {
        path: "/:id",
        element: <OverView />,
        loader: loader,
      },
    ],
  },
]);

async function start() {
  // Start our mock API server
  await worker.start({ onUnhandledRequest: "bypass" });

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={ROUTES} />
      </Provider>
    </React.StrictMode>,
  );
}

start();
