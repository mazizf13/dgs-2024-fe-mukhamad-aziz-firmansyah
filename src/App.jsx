import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import NavBar from "./components/header/NavBar";

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const root = document.getElementById("root");
    root.classList.add("transition-all", "duration-300");
    if (theme === "light") {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
  }, [theme]);

  return (
    <>
      <NavBar />
    </>
  );
}

export default App;
