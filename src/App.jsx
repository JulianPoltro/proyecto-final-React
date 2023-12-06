import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cotizador from "./Cotizador";
import Historial from "./Historial";
import NotFound from "./NotFound";
import Layout from "./Layout";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Cotizador />}></Route>
            <Route path="historial" element={<Historial />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route> 
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
