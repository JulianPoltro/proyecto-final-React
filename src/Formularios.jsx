import useStorage from "./hook/useStorage";

const Formulario = () => {
  const [vivienda, tipoVivienda] = useStorage("vivienda", []);

  return (
    <>
      <form onSubmit={() => cotizar()}>
        <fieldset>
          <label htmlFor="TipoEdificio">
            Seleccionar el tipo de edificación
          </label>
          <select name="Edificio" id="TipoEdificio">
          <option value={0} disabled defaultValue={0}>Selecciona un tipo de edificación</option>
          
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="TipoConstruccion">
            Seleccionar el tipo de construcción
          </label>
          <select name="Construccion" id="TipoConstruccion">
            <option value={0} disabled defaultValue={0}>Selecciona un tipo de construcción</option>
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="metrosCuadrados">
            Ingresar la cantidad de metros cuadrados
          </label>
          <input type="number" name="metrosCuadrados" id="metrosCuadrados" min={10} max={2000} defaultValue={10}/>
        </fieldset>
      </form>
    </>
  );
};

export default Formulario;
