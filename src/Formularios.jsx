import useStorage from "./hook/useStorage";

const Formulario = () => {
  const [num, setNum] = useStorage("contador",0)

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <button type="button" onClick={() => setNum(num + 1)}>
          Incrementar
        </button>
        <span>{num}</span>
        <button type="button" onClick={() => setNum(num - 1)}>
          Disminuir
        </button>
      </form>
    </>
  );
};

export default Formulario;
