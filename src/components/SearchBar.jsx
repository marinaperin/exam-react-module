import { useContext, useState } from "react";
import GlobalContext from "../GlobalContext";

export default function ({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const { language } = useContext(GlobalContext);

  const lang = {
    "en-US": {
      placeholder: "Write here",
      search: "Search",
    },
    "it-IT": {
      placeholder: "Scrivi qui",
      search: "Cerca",
    },
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder={lang[language].placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            onSearch(inputValue);
          }
        }}
      />
      <button
        onClick={() => {
          onSearch(inputValue);
        }}
      >
        {lang[language].search}
      </button>
    </div>
  );
}
