
import useStorage from "./hook/useStorage";

const Historial = () => {
  const [historial, setHistorial] = useStorage("historial", []);

  return (
    <>
      <h2>Historial de cotizaciones</h2>
      <ul className="ListaTitulos">
        <li>
          <p>Fecha</p>
          <p>Tipo de edificio</p>
          <p>Tipo de construcción</p>
          <p>Cantidad de M2</p>
          <p>Total</p>
        </li>
      </ul>
      {
        <ul className="ListaHistorial">
          {historial.map((e, i) => (
            <li key={i}>
              <p>{e.fecha}</p>
              <p>{e.edificio}</p>
              <p>{e.construccion}</p>
              <p>{e.metros} m2</p>
              <p>{e.total}</p>
            </li>
          ))}
        </ul>
      }
    </>
  );
};
export default Historial;
