import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  // Tri des événements par date décroissante
  const byDateDesc = data?.focus
    ? data?.focus.sort(
      (evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)
      // inversion de evtA et evtB, l'ordre d'affichage est demandé dans cet ordre la.
    )
    : [];

  useEffect(() => {

    const interval = setInterval(() => {
      setIndex((current) =>
        current < byDateDesc.length - 1 ? current + 1 : 0
      ); // l'index va de 0 à 2 et length va de 1 à 3 donc byDateDesc.lenght -1 pour l'image blanche
    }, 5000);
    return () => clearInterval(interval);
  }, [index, byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <>
          <div
            key={`eventIdx_${event.title}`}
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`radioIdx_${_.title}`} // Clé unique pour chaque bouton
                  type="radio"
                  name="radio-button"
                  value={radioIdx} // ajout de value sur les input
                  checked={index === radioIdx} // verification si l'index correspond à l'input
                  readOnly // ajout de readOnly, aucun événement au click sur les input radio
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
