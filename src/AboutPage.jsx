import { useContext } from "react";
import GlobalContext from "../GlobalContext";

export default function () {
  const {language} = useContext(GlobalContext);

  const lang = {
    "en-US": {
      about: "About",
      bio: "This is my exam project for the React module. I was tasked with creating a React App that allows you to search celebrities and displays them in the page.",
    },
    "it-IT": {
      about: "Chi Sono",
      bio: "Questo è il mio progetto di esame per il modulo React. Sono stata incaricata di creare una App React che ti permette di cercare celebrità, mostrandole in pagina.",
    },
  };

  return (
    <section className="description">
      <h2>{lang[language].about}</h2>
      <div>{lang[language].bio}</div>
    </section>
  );
}
