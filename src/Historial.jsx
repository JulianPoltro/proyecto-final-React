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
};
export default Historial;
