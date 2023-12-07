import { useEffect, useState } from "react";
import useStorage from "./hook/useStorage";

const Formulario = () => {
  const [opcionEdificio, setOpcionEdificio] = useState([]);
  const [opcionConstruccion, setOpcionConstruccion] = useState([]);

  useEffect(() => {
    const datos = () => {
      fetch("/data.json")
        .then((respuesta) => {
          if (!respuesta.ok) {
            throw new Error("Error al cargar los datos");
          }
          return respuesta.json();
        })
        .then((data) => {
          setOpcionEdificio(data.filter(({ tipo }) => tipo == "edificacion"));
          setOpcionConstruccion(
            data.filter(({ tipo }) => tipo == "construccion")
          );
        })
        .catch((error) => {
          console.error(error);
        });
    };
    datos();
  }, []);

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
            {opcionEdificio.map((target) => (
              <option key={target.id} value={target.id}>
                {target.vivienda}
              </option>
            ))}
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
            {opcionConstruccion.map((target) => (
              <option key={target.id} value={target.id}>
                {target.vivienda}
              </option>
            ))}
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
        <button id="btn">Cotizar</button>
        <button type="button" id="save">
          Guardar
        </button>
      </form>
    </>
  );
};

export default Formulario;
