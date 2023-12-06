import { useState, useEffect } from "react";

const useStorage = (clave, valorInicial) => {
  const [valor, setValor] = useState(() => {
    let storage = localStorage.getItem(clave);
    if (storage) return JSON.parse(storage);
    localStorage.setItem(clave, valorInicial);
    return valorInicial;
  });

  useEffect(() => localStorage.setItem(clave, valor), [valor]);

  return [valor, setValor];
};

export default useStorage;
