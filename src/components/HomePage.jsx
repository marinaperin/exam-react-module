import { useContext, useEffect, useState } from "react";
import PersonCard from "./PersonCard";
import GlobalContext from "../GlobalContext";

export default function () {
  const [celebrities, setCelebrities] = useState([]);
  const [error, setError] = useState("");
  const { language, apiKey } = useContext(GlobalContext);

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
  });

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/person/day?${query.toString()}`
    )
      .then((response) => response.json())
      .then((obj) => {
        setCelebrities(obj.results);
      })
      .catch((err) => {
        console.error(err);
        setError(lang[language].error);
      });
  }, [language]);

  return (
    <main>
      {error && <div>{error}</div>}
      {!error &&
        celebrities &&
        celebrities.map((celebrity) => {
          return (
            <div key={celebrity.id}>
              <PersonCard
                id={celebrity.id}
                name={celebrity.name}
                occupation={celebrity.known_for_department}
                sex={celebrity.gender}
                popularity={celebrity.popularity}
                works={celebrity.known_for}
                imagePath={celebrity.profile_path}
              />
            </div>
          );
        })}
    </main>
  );
}
