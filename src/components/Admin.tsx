import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  PersonFromDbInterface,
  createPerson,
  deteleTransformations,
  getTransformations,
} from "./methods/personsController";

export interface PersonTransformationInterface {
  name: string;
  imageBefore: string;
  imageAfter: string;
}

function Admin() {
  const [personTransformation, setPersonTransformation] =
    useState<PersonTransformationInterface>({
      name: "",
      imageBefore: "",
      imageAfter: "",
    });
  const [inputsInvalid, setInputsInvalid] = useState<string>("");
  const [successAdd, setSuccessAdd] = useState<string>("");
  const [trasnformationsList, setTransformationsList] =
    useState<PersonFromDbInterface[]>();
  const [errorAdd, setErrorAdd] = useState<string>("");
  const [deleteError, setDeleteError] = useState<string>("");
  const [errorGetData, setErrorGetData] = useState<string>("");
  const [loadingById, setLoadingById] = useState<string>("");
  const [loadingFetch, setLoadingFetch] = useState<boolean>(true);
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const fetchTransformations = async () => {
    try {
      const transformationsData = await getTransformations();
      setTransformationsList(transformationsData);
    } catch (error) {
      setErrorGetData("Ocurrió un error al traer los datos");
    }
    setLoadingFetch(false);
  };

  useEffect(() => {
    fetchTransformations();
  }, []);

  if (inputsInvalid || errorAdd || deleteError) {
    setTimeout(() => {
      setInputsInvalid("");
      setErrorAdd("");
    }, 3000);
  }

  if (successAdd) {
    fetchTransformations();
    setTimeout(() => {
      setPersonTransformation({
        ...personTransformation,
        name: "",
      });
      setSuccessAdd("");
    }, 3000);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const inputs = Object.entries(personTransformation);
    const inputsEmpty = inputs.filter((e) => e[1] === "");
    if (inputsEmpty.length > 0) {
      setInputsInvalid("Todos los campos son obligatorios");
      return;
    }

    setLoadingForm(true);
    try {
      const addPerson: PersonFromDbInterface | undefined = await createPerson(
        personTransformation
      );
      if (addPerson) {
        setSuccessAdd("Los datos fueron agregados correctamente");
      }
    } catch (error) {
      setErrorAdd("Los datos no pudieron ser cargados correctamente");
    }

    setLoadingForm(false);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setPersonTransformation({ ...personTransformation, name: name });
  };

  const handleImageBefore = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      setPersonTransformation({
        ...personTransformation,
        imageBefore: reader.result !== null ? reader.result.toString(): '',
      });
    };}
  };

  const handleImageAfter = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      setPersonTransformation({
        ...personTransformation,
        imageAfter: reader.result !== null ? reader.result.toString(): '',
      });
    };}
  };

  const handleDelete = async (id: string) => {
    setLoadingById(id);
    try {
      const transformationDeleted = await deteleTransformations(id);
      if (transformationDeleted) {
        fetchTransformations();
      }
      setTimeout(() => {
        setLoadingById("");
      }, 500);
    } catch (error) {
      setDeleteError("Error al eliminar el registro");
    }
  };

  return (
    <section id="Panel" className="borde">
      <h1>Administra las trasnformaciones</h1>
      {loadingForm ? (
        <div className="alert-container">
          <span className="loader"></span>
        </div>
      ) : successAdd ? (
        <div className="alert-container">
          <p className="success-message">{successAdd}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <legend>Agrega una nueva transformación</legend>
          <div className="errors-container">
            {inputsInvalid && (
              <p className="errors-form-alert">{inputsInvalid}</p>
            )}
            {errorAdd && <p className="errors-form-alert">{errorAdd}</p>}
          </div>
          <div className="form-control">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              onChange={handleName}
              name="name"
              placeholder="Ingresar un nombre"
              type="text"
            />
          </div>
          <div className="form-control">
            <label htmlFor="image-before">Imagen antes</label>
            <input
              type="file"
              onChange={handleImageBefore}
              title="image-before"
              name="imgBefore"
              id=""
            />
            {personTransformation.imageBefore && (
              <img
                className="miniature-img"
                src={personTransformation.imageBefore}
                alt=""
              />
            )}
          </div>
          <div className="form-control">
            <label htmlFor="image-after">Imagen después</label>
            <input
              type="file"
              placeholder="hola"
              onChange={handleImageAfter}
              title="image-after"
              name="imgAfter"
              id=""
            />
            {personTransformation.imageAfter && (
              <img
                className="miniature-img"
                src={personTransformation.imageAfter}
                alt=""
              />
            )}
          </div>
          <input type="submit" className="submit-button" />
        </form>
      )}
      <div className="gallery-admin">
        {loadingFetch ? (
          <div className="alert-container">
            <span className="loader"></span>
          </div>
        ) : errorGetData ? (
          <div className="alert-container">
            <span className="error-color">Ocurrió un error al traer los datos</span>
          </div>
        ) : (
          trasnformationsList &&
          trasnformationsList.map((transformation, index) => (
            <div
              key={`${transformation.namePerson}${index}`}
              className="img-admin-gallery borde"
            >
              {loadingById === transformation._id ? (
                <div className="loader-container">
                  <span className="loader"></span>
                </div>
              ) : (
                <>
                  {" "}
                  <div className="img-container">
                    <img
                      src={transformation.imageBefore}
                      alt={transformation.namePerson}
                    />
                  </div>
                  <div className="img-container">
                    <img
                      src={transformation.imageAfter}
                      alt={transformation.namePerson}
                    />
                  </div>
                  <div
                    className="delete-button"
                    onClick={() => handleDelete(transformation._id)}
                  >
                    x
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
      <Link to={"/"} className="link-home">
        <FontAwesomeIcon icon={faHouse} />
      </Link>
    </section>
  );
}

export default Admin;
