import App from "./App";
import React from "react";
import store from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
