import Modal from "./Modal";
import { useState, useEffect } from "react";
import {
  PersonFromDbInterface,
  getTransformations,
} from "./methods/personsController";

export interface PersonTransformation {
  persons: PersonFromDbInterface[];
  indexSelected: number;
}

function Grid() {
  const [showModal, setShowModal] = useState<PersonTransformation | null>();
  const [trasnformationsList, setTrasnformationsList] =
    useState<PersonFromDbInterface[]>();
  const [errorGetData, setErrorGetData] = useState<string>();
  const [loadingData, setLoadingData] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const allTransformations = await getTransformations();
      setTrasnformationsList(allTransformations);
    } catch (error) {
      setErrorGetData("Ocurrió un error al traer los datos");
    }
    setLoadingData(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGridElementClick = (index: number) => {
    if (trasnformationsList) {
      setShowModal({ persons: trasnformationsList, indexSelected: index });
    }
  };

  const handleCloseModal = () => {
    setShowModal(null);
  };

  return (
    <section id="Grid">
      {loadingData ? (
        <div className="alert-container">
          <span className="loader"></span>
        </div>
      ) : (
        errorGetData?
        <div className="alert-container">
          <span className="error-color">Ocurrió un error al conseguir los datos</span>
        </div>
        :
        trasnformationsList &&
        trasnformationsList.map((transformation, index) => (
          <div
            key={transformation._id}
            className="borde grid-element hover"
            onClick={() => handleGridElementClick(index)}
          >
            <img
              src={transformation.imageBefore}
              alt={transformation.namePerson}
            />
          </div>
        ))
      )}
      {showModal && (
        <Modal personsData={showModal} handleShowModal={handleCloseModal} />
      )}
    </section>
  );
}

export default Grid;
