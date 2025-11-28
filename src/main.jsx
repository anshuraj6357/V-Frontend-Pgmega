import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { appStore } from "./store/store.js";
import "./index.css"; // Import global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={appStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
