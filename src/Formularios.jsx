import { useEffect, useState } from "react";
import useStorage from "./hook/useStorage";
import useFetch from "./hook/useFetch";

const Formulario = () => {
  // useStorage("historial", []);
  const [historial, setHistorial] = useState(() => {
    let storage = localStorage.getItem("historial");
    if (storage) return JSON.parse(storage);
    localStorage.setItem("historial", JSON.stringify([]));
    return [];
  });
  useEffect(
    () => localStorage.setItem("historial", JSON.stringify(historial)),
    [historial]
  );

  const [load, setLoad] = useState(false);
  const [opcionEdificio, setOpcionEdificio] = useState([]);
  const [opcionConstruccion, setOpcionConstruccion] = useState([]);
  const [tipoEdificio, setTipoEdificio] = useState(0);
  const [tipoConstruccion, setTipoConstruccion] = useState(0);
  const [metrosCuadrados, setMetrosCuadrados] = useState(10);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    setLoad(true);
    const datos = () => {
      useFetch()
        .then((respuesta) => {
          setOpcionEdificio(
            respuesta.filter(({ tipo }) => tipo == "edificacion")
          );
          setOpcionConstruccion(
            respuesta.filter(({ tipo }) => tipo == "construccion")
          );
        })
        .catch((error) => console.error(error))
        .finally(() => setLoad(false));
    };
    datos();
  }, []);

  const cotizar = (e) => {
    e.preventDefault();
    setLoad(true);
    setTimeout(() => {
      useFetch().then((data) => {
        let edificaciones = data.find(({ id }) => id == tipoEdificio);
        if (!edificaciones) return alert("Selecciona un tipo de vivienda");
        let construcciones = data.find(({ id }) => id == tipoConstruccion);
        if (!construcciones) return alert("Selecciona un tipo de construccion");
        if (metrosCuadrados < 10)
          return alert("El minimo a cotiazar es de 10 m2");
        let base = parseFloat(
          200000 *
            metrosCuadrados *
            edificaciones.incremento *
            construcciones.incremento
        ).toFixed(2);
        setLoad(false);
        return setTotal(base);
      });
    }, 2000);
  };

  const guardar = () => {
    console.log(historial);
  };
  return (
    <>
      {load && (
        <>
          <p>Cargando los datos</p>
        </>
      )}
      {!load && (
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
              <option value={0} disabled>
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
              <option value={0} disabled>
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
              value={metrosCuadrados}
              onChange={(e) => setMetrosCuadrados(e.target.value)}
            />
          </fieldset>
          <button type="submit" id="btn">
            Cotizar
          </button>
        </form>
      )}

      {total && (
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>El valor de la construccion es de $ {total}</h2>
          <button type="button" onClick={guardar}>
            Guardar
          </button>
        </form>
      )}
    </>
  );
};

export default Formulario;
