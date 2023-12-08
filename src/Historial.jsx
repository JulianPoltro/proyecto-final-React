import { useEffect, useState } from "react";

const Historial = () => {
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

  return (
    <>
      <h2>Historial de cotizaciones</h2>
      {
        <ul>
          {historial.map((e, i) => (
            <li key={i}>
              <p>Fecha: {e.fecha}</p>
              <p>Tipo de edificio: {e.edificio}</p>
              <p>Tipo de Construccion: {e.construccion}</p>
              <p>Cantidad de M2: {e.metros} m2</p>
              <p>Total: $ {e.total}</p>
            </li>
          ))}
        </ul>
      }
    </>
  );
};
export default Historial;
