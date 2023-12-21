import { useContext } from "react";
import { Link} from "react-router-dom";
import GlobalContext from "../GlobalContext";

export default function ({
  id,
  name,
  occupation,
  sex,
  popularity,
  works,
  imagePath,
}) {
  const { genders } = useContext(GlobalContext);
  return (
    <div className="person-card">
      <Link to={`person/${id}`}>
        <section className="top-card">
          <div className="intro-card">
            <h3>{name}</h3>
            <div className="subtitle-card">
              <p className="popularity">{popularity.toFixed(1)}</p>
              <p>{occupation}</p>
              <p className="sex">{genders[sex]}</p>
            </div>
          </div>
          <figure>
            <img
              src={
                imagePath === null || imagePath === undefined
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                  : `https://image.tmdb.org/t/p/w500${imagePath}`
              }
              alt={name}
            />
          </figure>
        </section>
        <div>
          <ul>
            {works.map((work) => {
              return <li key={work.id}>{work.title || work.name}</li>;
            })}
          </ul>
        </div>
      </Link>
    </div>
  );
}
