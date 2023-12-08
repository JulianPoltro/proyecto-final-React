import { useState } from "react";
import useFetch from "./useFetch";

const useDolar = (url) => {
  const [valor, setValor] = useState(() => {
    useFetch(url).then((resp) => {
        let valorDolar = resp;
        return setValor(valorDolar);
      });
  });

  return [valor, setValor];
};

export default useDolar;
