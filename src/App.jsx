import React from "react";
import Projects from "./components/Projects/Projects";
import css from "./App.module.css";

function App() {
  return (
    <>
      <header className={css.header}>
        <Projects />
      </header>
    </>
  );
}

export default App;
