import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function ({ changeLanguage }) {
  const [pageLanguage, setPageLanguage] = useState("en-US");

  const lang = {
    "en-US": {
      home: "Home",
      about: "About",
      search: "Search",
    },
    "it-IT": {
      home: "Home",
      about: "Chi Sono",
      search: "Cerca",
    },
  };

  return (
    <nav>
      <menu>
        <NavLink to="/">{lang[pageLanguage].home}</NavLink>
        <NavLink to="about">{lang[pageLanguage].about}</NavLink>
        <NavLink to="search">{lang[pageLanguage].search}</NavLink>
        <li>
          <select
            value={pageLanguage}
            onChange={(e) => {
              setPageLanguage(e.target.value);
              changeLanguage(e.target.value);
            }}
          >
            <option value="en-US">EN</option>
            <option value="it-IT">IT</option>
          </select>
        </li>
      </menu>
    </nav>
  );
}
