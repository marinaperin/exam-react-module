import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalContext from "../GlobalContext";
import dayjs from "dayjs";

export default function () {
  const { id } = useParams();
  const { apiKey, genders, language } = useContext(GlobalContext);
  const [person, setPerson] = useState({});
  const [error, setError] = useState();
  const currentYear = new Date().getFullYear();
  const birthYear = dayjs(person.birthday).format("YYYY");

  const lang = {
    "en-US": {
      error: "Person not found",
      sex: "Sex",
      age: "Age",
      occupation: "Occupation",
    },
    "it-IT": {
      error: "Nessun personaggio trovato",
      sex: "Sesso",
      age: "Età",
      occupation: "Occupazione",
    },
  };

  const query = new URLSearchParams({
    api_key: apiKey,
    language: language,
  });

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${id}?${query.toString()}`)
      .then((response) => response.json())
      .then((obj) => setPerson(obj))
      .catch((err) => {
        console.error(err);
        setError(lang[language].error);
      });
  }, [id, language]);

  return (
    <div>
      {error && <div>{error}</div>}
      {!error && person && (
        <>
          <h2>{person.name}</h2>
          <div className="profile-page">
            <section className="personPage-left">
              <figure>
                <img
                  src={
                    person.profile_path === null ||
                    person.profile_path === undefined
                      ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                      : `https://image.tmdb.org/t/p/w500${person.profile_path}`
                  }
                  alt={person.name}
                />
              </figure>
            </section>
            <section className="personPage-right">
              <ul>
                <li>
                  <strong>{lang[language].sex}:</strong>{" "}
                  {genders[person.gender]}
                </li>
                <li>
                  <strong>{lang[language].age}:</strong>{" "}
                  {currentYear - birthYear}
                </li>
                <li>
                  <strong>{lang[language].occupation}:</strong>{" "}
                  {person.known_for_department}
                </li>
                <li>
                  <strong>Bio:</strong> {person.biography}
                </li>
              </ul>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
