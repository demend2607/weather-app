import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.scss";
import TrekBagContextProvider from "./contexts/TrekBagContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TrekBagContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TrekBagContextProvider>
  </React.StrictMode>
);
