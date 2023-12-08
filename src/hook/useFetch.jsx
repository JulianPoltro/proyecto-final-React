const useFetch = async () => {
  try {
    const data = await fetch("/data.json");
    if (!data.ok) {
      throw new Error("Error al cargar los datos");
    }
    const respuesta = await data.json();
    return respuesta;
  } catch (error) {
    console.error(error.message);
  }
};

export default useFetch;
