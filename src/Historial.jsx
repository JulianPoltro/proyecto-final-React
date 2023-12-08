
import useStorage from "./hook/useStorage";

const Historial = () => {
  const [historial, setHistorial] = useStorage("historial", []);

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
              <p>Total: {e.total}</p>
            </li>
          ))}
        </ul>
      }
    </>
  );
};
export default Historial;
