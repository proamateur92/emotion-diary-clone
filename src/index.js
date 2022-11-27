// react
import ReactDOM from "react-dom/client";

// css
import "./index.css";

// router
import { BrowserRouter } from "react-router-dom";

// components
import App from "./App";
import Layout from "./components/Layout/Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Layout>
      <App />
    </Layout>
  </BrowserRouter>
);
