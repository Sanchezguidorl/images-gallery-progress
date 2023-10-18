import { Link } from "react-router-dom";
import Grid from "./Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";

function Gallery() {
  return (
    <>
      <Link to={"/admin"} className="link-admin">
        <FontAwesomeIcon icon={faToolbox} />
      </Link>
      <main id="Panel" className="borde">
        <h1>
          Mira el progreso de quienes adquirieron el plan de entrenamiento
        </h1>
        <Grid />
      </main>
    </>
  );
}

export default Gallery;
