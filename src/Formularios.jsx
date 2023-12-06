import useStorage from "./hook/useStorage";

const Formulario = () => {
  const [vivienda, tipoVivienda] = useStorage("vivienda", []);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset>
        <legend>Cotizar M2 de construcción</legend>
        <label htmlFor="select">Seleccionar el tipo de construcción</label>
          <select name="Construccion" id="TipoConstruccion">
            <option value="steel">Steel Frame</option>
            <option value="balloon">Balloon Frame</option>
            <option value="tradicional">Construccion tradicional</option>
          </select>
          
          <button type="button" onClick={(e) => tipoVivienda([...vivienda, e.target.value])}>
            cotizar
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default Formulario;
