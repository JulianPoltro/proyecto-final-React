import { BrowserRouter, Routes, Route } from "react-router-dom";
import Historial from "./Historial";
import NotFound from "./NotFound";
import Layout from "./Layout";
import Formulario from "./Formularios";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="historial" element={<Historial />}></Route>
            <Route index element={<Formulario />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
