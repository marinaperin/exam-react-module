import { useContext, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import PersonCard from "./PersonCard";
import GlobalContext from "../GlobalContext";

export default function () {
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState();
  const { apiKey, language } = useContext(GlobalContext);

  const lang = {
    "en-US": {
      error: "There was an error, try again",
    },
    "it-IT": {
      error: "C'è stato un errore, riprova",
    },
  };

  const query = new URLSearchParams({
    api_key: apiKey,
    language: language,
    query: searchValue,
  });

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/person?${query.toString()}`)
      .then((response) => response.json())
      .then((obj) => {
        setResults(obj.results);
      })
      .catch((err) => {
        console.error(err);
        setError(lang[language].error);
      });
  }, [searchValue, language]);

  return (
    <div>
      <h2></h2>
      <SearchBar
        onSearch={(inputValue) => {
          setSearchValue(inputValue);
        }}
      />
      {error && <div>{error}</div>}
      {!error && results && (
        <main>
          {results.map((person) => {
            return (
              <PersonCard
                key={person.id}
                id={person.id}
                name={person.name}
                occupation={person.known_for_department}
                sex={person.gender}
                popularity={person.popularity}
                works={person.known_for}
                imagePath={person.profile_path}
              />
            );
          })}
        </main>
      )}
    </div>
  );
}
