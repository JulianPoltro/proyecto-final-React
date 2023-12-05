import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home"
import About from "./About"
import Historial from "./Historial"
import NotFound from "./NotFound"
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/nosotros" element={<About />}></Route>
          <Route path="/historial" element={<Historial />}></Route>
          <Route path="*" element={<NotFound />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
