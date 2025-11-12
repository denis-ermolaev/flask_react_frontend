import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContextProvider from "./context/UserContextProvider.jsx";
import UIContextProvider from "./context/UIContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <UIContextProvider>
        <App />
      </UIContextProvider>
    </UserContextProvider>
  </StrictMode>
);
