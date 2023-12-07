import { useEffect, useState } from "react";
import useStorage from "./hook/useStorage";

const Formulario = () => {
  const [opcionEdificio, setOpcionEdificio] = useState([]);
  const [opcionConstruccion, setOpcionConstruccion] = useState([]);
  const [tipoEdificio, setTipoEdificio] = useState(0);
  const [tipoConstruccion, setTipoConstruccion] = useState(0);
  const [metrosCuadrados, setMetrosCuadrados] = useState(10);

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

  const cotizar = (e) => {
    e.preventDefault();
    fetch("/data.json")
      .then((data) => {
        if (!data.ok) {
          throw new Error("Error al cargar los datos");
        }
        return data.json();
      })
      .then((data) => {
        let edificaciones = data.find(({ id }) => id == tipoEdificio);
        if (!edificaciones) return alert("Selecciona un tipo de vivienda");
        let construcciones = data.find(({ id }) => id == tipoConstruccion);
        if (!construcciones) return alert("Selecciona un tipo de construccion");
        if (metrosCuadrados < 10) return alert("El minimo a cotiazar es de 10 m2");
        let base = parseFloat(200000 * metrosCuadrados * edificaciones.incremento * construcciones.incremento).toFixed(2);
        alert("El valor de la construccion es de $" + base)
        return base;
      });
  };


  return (
    <>
      <form onSubmit={cotizar}>
        <fieldset>
          <label htmlFor="TipoEdificio">
            Seleccionar el tipo de edificación
          </label>
          <select
            name="Edificio"
            id="TipoEdificio"
            value={tipoEdificio}
            onChange={(e) => setTipoEdificio(e.target.value)}
          >
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
          <select
            name="Construccion"
            id="TipoConstruccion"
            value={tipoConstruccion}
            onChange={(e) => setTipoConstruccion(e.target.value)}
          >
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
            value={metrosCuadrados}
            onChange={(e) => setMetrosCuadrados(e.target.value)}
          />
        </fieldset>
        <button type="submit" id="btn">
          Cotizar
        </button>
        <button type="button" id="save">
          Guardar
        </button>
      </form>
    </>
  );
};

export default Formulario;
