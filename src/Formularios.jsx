import { useState } from "react";
import useStorage from "./hook/useStorage";

const Formulario = () => {
  const [opcionEdificio, setOpcionEdificio] = useState([]);
  const [opcionConstruccion, setOpcionConstruccion] = useState([]);

  const datos = () => {
    fetch("/data.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al cargar los datos");
        }
        return respuesta.json();
      })
      .then((data) => {
        setOpcionEdificio(data.TipoEdificacion);
        setOpcionConstruccion(data.TipoConstruccion);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(opcionEdificio, opcionConstruccion);


  return (
    <>
      <form onSubmit={() => cotizar()}>
        <fieldset>
          <label htmlFor="TipoEdificio">
            Seleccionar el tipo de edificación
          </label>
          <select name="Edificio" id="TipoEdificio">
            <option value={0} disabled defaultValue={0}>
              Selecciona un tipo de edificación
            </option>
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="TipoConstruccion">
            Seleccionar el tipo de construcción
          </label>
          <select name="Construccion" id="TipoConstruccion">
            <option value={0} disabled defaultValue={0}>
              Selecciona un tipo de construcción
            </option>
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="metrosCuadrados">
            Ingresar la cantidad de metros cuadrados
          </label>
          <input
            type="number"
            name="metrosCuadrados"
            id="metrosCuadrados"
            min={10}
            max={2000}
            defaultValue={10}
          />
        </fieldset>
      </form>
    </>
  );
};

export default Formulario;
