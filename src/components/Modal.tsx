import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons/faCircleChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PersonFromDbInterface } from "./methods/personsController";

export interface PersonsPrevAndNowInterface {
    personsData:{persons: PersonFromDbInterface[];
    indexSelected: number;}
    handleShowModal: ()=> void;
  }

function Modal({ personsData, handleShowModal}:PersonsPrevAndNowInterface) {
  const personsArray = personsData.persons;
  const [personByIndex, setPersonByIndex] = useState<PersonFromDbInterface>(
    personsArray[personsData.indexSelected]
  );
  const [changePerson, setChangePerson] = useState<boolean>(false);

  if (changePerson) {
    setTimeout(() => {
      setChangePerson(false);
    }, 1000);
  }

  const handleNextPerson = () => {
    if (!changePerson) {
      setChangePerson(true);
      const currentTndex = personsArray.indexOf(personByIndex);
      if (currentTndex === personsArray.length - 1) {
        setPersonByIndex(personsArray[0]);
        return;
      }
      setPersonByIndex(personsArray[currentTndex + 1]);
    }
  };

  const handlePrevPerson = () => {
    if (!changePerson) {
      setChangePerson(true);
      const currentTndex = personsArray.indexOf(personByIndex);
      if (currentTndex === 0) {
        const endIndex = personsArray.length - 1;
        setPersonByIndex(personsArray[endIndex]);
        return;
      }
      setPersonByIndex(personsArray[currentTndex - 1]);
    }
  };

  return (
    <div id="Modal">
      <div className="modal-content borde">
        <p className="close-modal" onClick={handleShowModal}>
        <FontAwesomeIcon icon={faCircleXmark} />
        </p>
        <h2 className={`${changePerson && "fade"}`}>{personByIndex.namePerson}</h2>
        <div className={`${changePerson && "fade"} img-modal`}>
          <h3 className="img-description">Antes</h3>
          <img src={personByIndex.imageBefore} alt={`${personByIndex.namePerson} antes del cambio`} />
        </div>
        <div className={`${changePerson && "fade"} img-modal`}>
          <h3 className="img-description">Después</h3>
          <img src={personByIndex.imageAfter} alt={`${personByIndex.namePerson} luego del cambio`} />
        </div>
        <button className="button-left" onClick={handlePrevPerson}>
        <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <button className="button-right" onClick={handleNextPerson}>
        <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>
    </div>
  );
}

export default Modal;
