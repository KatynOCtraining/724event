import { useState, useEffect } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null); // Initialisé à null pour indiquer "pas de filtre"
  const [currentPage, setCurrentPage] = useState(1);

  // Logique de filtrage pour obtenir les événements selon le type et la page actuelle
  const getFilteredEvents = () => {
    const filteredEvents =
      data?.events.filter((event) => {
        const isInType = type ? event.type === type : true;
        return isInType;
      }) || [];
    const startIndex = (currentPage - 1) * PER_PAGE;
    const endIndex = startIndex + PER_PAGE;
    return filteredEvents.slice(startIndex, endIndex);
  };

  useEffect(() => {
    console.log("Data:", data);
    console.log("Error:", error);
    console.log("Type:", type);
    console.log("Current Page:", currentPage);
    console.log("Filtered Events:", getFilteredEvents());
  }, [data, error, type, currentPage]);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
    console.log("Type changed to:", evtType, "Current Page reset to 1");
  };

  const getPageNumber = () => {
    const totalFilteredItems = (
      data?.events.filter((event) => (type ? event.type === type : true)) || []
    ).length;
    console.log("Total filtered items:", totalFilteredItems);
    return Math.ceil(totalFilteredItems / PER_PAGE);
  };

  const getTypeList = () => {
    const types = new Set(data?.events.map((event) => event.type));
    console.log("Type List:", Array.from(types));
    return types;
  };

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "Loading..."
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select selection={Array.from(getTypeList())} onChange={changeType} />
          <div id="events" className="ListContainer">
            {getFilteredEvents().map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(getPageNumber())].map((_, n) => (
              <button
                type="button"
                key={`page-${n + 1}`}
                onClick={() => setCurrentPage(n + 1)}
              >
                {n + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
