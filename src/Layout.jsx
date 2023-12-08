import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
        <Header />
        <nav className="navegador">
            <Link to={"/"}>Cotizador</Link>
            <Link to={"/Historial"}>Historial</Link>
        </nav>
        <Outlet />
        <Footer />
        </>
    );
};

export default Layout;
