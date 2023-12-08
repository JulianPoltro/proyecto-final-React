import { useEffect, useState } from "react";
import useStorage from "./hook/useStorage";
import useFetch from "./hook/useFetch";
import Swal from "sweetalert2";
import useDolar from "./hook/useDolar";

const Formulario = () => {
  const [historial, setHistorial] = useStorage("historial", []);
  const [load, setLoad] = useState(false);
  const [opcionEdificio, setOpcionEdificio] = useState([]);
  const [opcionConstruccion, setOpcionConstruccion] = useState([]);
  const [tipoEdificio, setTipoEdificio] = useState(0);
  const [tipoConstruccion, setTipoConstruccion] = useState(0);
  const [metrosCuadrados, setMetrosCuadrados] = useState(10);
  const [total, setTotal] = useState(null);
  const [dolar, setDolar] = useDolar("https://dolarapi.com/v1/dolares/blue");

  let pesos = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  useEffect(() => {
    setLoad(true);
    const datos = () => {
      useFetch("/data.json")
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
    setTotal(null);

    if (tipoEdificio == 0)
      return Swal.fire({
        title: null,
        text: "Debes elegir un tipo de edificación.",
        icon: "error",
      });
    if (tipoConstruccion == 0)
      return Swal.fire({
        title: null,
        text: "Debes elegir un tipo de construcción.",
        icon: "error",
      });
    if (metrosCuadrados < 10)
      return Swal.fire({
        title: null,
        text: "Los metros mínimos a cotizar son 10 m2.",
        icon: "error",
      });
    setLoad(true);
    setTimeout(() => {
      useFetch("/data.json").then((data) => {
        let edificaciones = data.find(({ id }) => id == tipoEdificio);
        let construcciones = data.find(({ id }) => id == tipoConstruccion);
        let base = parseFloat(
          dolar.venta *
            357 *
            metrosCuadrados *
            edificaciones.incremento *
            construcciones.incremento
        ).toFixed(2);

        setLoad(false);
        return setTotal(pesos.format(base));
      });
    }, 2000);
  };

  const guardar = () => {
    setHistorial([
      ...historial,
      {
        fecha: new Date().toLocaleDateString("es-ar"),
        edificio: opcionEdificio.find(({ id }) => id == tipoEdificio).vivienda,
        construccion: opcionConstruccion.find(
          ({ id }) => id == tipoConstruccion
        ).vivienda,
        metros: metrosCuadrados,
        total: total,
      },
    ]);
    setTotal(null);
    return Swal.fire({
      title: null,
      text: "Historial actualizado con exito!",
      icon: "success",
    });
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
          <h2>El valor de la construccion es de {total}</h2>
          <button type="button" onClick={guardar}>
            Guardar
          </button>
        </form>
      )}
    </>
  );
};

export default Formulario;
