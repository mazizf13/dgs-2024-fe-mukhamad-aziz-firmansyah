import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StateProvider from "./context/StateContext.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StateProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StateProvider>
  </StrictMode>,
);
