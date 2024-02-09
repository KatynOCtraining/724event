import React from "react";
import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date,
  title,
  label,
  small,
  ...props
}) => (
  <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`}
    {...props}
  >
    <div className="EventCard__imageContainer">
      <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      <div className="EventCard__label">{label}</div>
    </div>
    <div className="EventCard__descriptionContainer">
      <div className="EventCard__title">{title}</div>
      <div className="EventCard__month">{getMonth(date)}</div>
    </div>
  </div>
);

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  small: PropTypes.bool,
};

EventCard.defaultProps = {
  imageAlt: "image", // Valeur par défaut pour imageAlt
  date: new Date(), // Valeur par défaut pour date
  small: false, // Valeur par défaut pour small
};

export default EventCard;
