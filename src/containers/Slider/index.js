import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [sortedData, setSortedData] = useState([]);

  // Tri des événements du plus ancien au plus récent au moment du chargement du composant
  useEffect(() => {
    if (data?.focus) {
      const sorted = [...data.focus].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setSortedData(sorted);
    }
  }, [data]);

  // Gestion de l'index pour le slider
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sortedData.length);
    }, 5000);

    // Nettoyer le timer lors du démontage du composant
    return () => clearTimeout(timer);
  }, [index, sortedData.length]);

  return (
    <div className="SlideCardList">
      {sortedData.map((event, idx) => (
        <div
          key={event.id}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {sortedData.map((event, radioIdx) => (
            <input
              key={event.id}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
