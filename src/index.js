// react
import React from "react";
import ReactDOM from "react-dom/client";

// css
import "./index.css";

// router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import Main from "./pages/Main";
import DiaryWrite from "./pages/DiaryWrite";
import DiaryDetail from "./pages/DiaryDetail";
import DiaryEdit from "./pages/DiaryEdit";
import ErrorPage from "./pages/ErrorPage";

// components
import Layout from "./components/Layout/Layout";
import Header from "./components/Layout/Header";
import Button from "./components/Layout/Button";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Header
          headerText="헤더 텍스트"
          leftChild={<Button buttonText="<" onClick={() => alert("<")} />}
          rightChild={<Button buttonText=">" onClick={() => alert("<")} />}
        />
        <Main />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
  },
  {
    path: "/diary/:id",
    element: <DiaryDetail />,
  },
  {
    path: "/write",
    element: <DiaryWrite />,
  },
  {
    path: "/edit",
    element: <DiaryEdit />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
