import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
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
      birthPlace: "Birth Place",
    },
    "it-IT": {
      error: "Nessun personaggio trovato",
      sex: "Sesso",
      age: "Età",
      occupation: "Occupazione",
      birthPlace: "Nato a",
    },
  };

  const query = new URLSearchParams({
    api_key: apiKey,
    language: language,
  });

  useEffect(() => {
    if (!id) {
      setError(lang[language].error);
      return;
    }
    fetch(`https://api.themoviedb.org/3/person/${id}?${query.toString()}`)
      .then((response) => response.json())
      .then((obj) => {
        if (obj.success === false) {
          setError(lang[language].error);
          return;
        } else {
          setPerson(obj);
        }
      })
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
          {id && (
            <>
              <h2>{person.name}</h2>
              <div className="profile-page">
                <section>
                  <figure>
                    <a href={person.homepage}>
                      <img
                        src={
                          person.profile_path === null ||
                          person.profile_path === undefined
                            ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                            : `https://image.tmdb.org/t/p/w500${person.profile_path}`
                        }
                        alt={person.name}
                        className="profile-pic"
                      />
                    </a>
                  </figure>
                </section>
                <section>
                  <ul>
                    <li>
                      <strong>{lang[language].sex}:</strong>{" "}
                      {genders[person.gender]}
                    </li>
                    <li>
                      <strong>{lang[language].age}:</strong>{" "}
                      {isNaN(currentYear - birthYear)
                        ? "N-S"
                        : currentYear - birthYear}
                    </li>
                    <li>
                      <strong>{lang[language].birthPlace}:</strong>{" "}
                      {person.place_of_birth}
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
        </>
      )}
    </div>
  );
}
