import "./App.scss";
import { Route, Routes } from "react-router-dom";
import GlobalContext from "./GlobalContext";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import SearchPage from "./components/SearchPage";
import PersonPage from "./components/PersonPage";
import { useState } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [pageLanguage, setPageLanguage] = useState("en-US");

  return (
    <>
      <GlobalContext.Provider
        value={{
          language: pageLanguage,
          apiKey,
          genders: {
            0: "N-S",
            1: "F",
            2: "M",
            3: "Non-binary",
          },
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="person/:id" element={<PersonPage />} />
          <Route path="search/person/:id" element={<PersonPage />} />
        </Routes>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
