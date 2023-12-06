import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
    <>
        <nav>
            <Link to={"/"}>Cotizador</Link>
            <Link to={"/Historial"}>Historial</Link>
        </nav>
        <Outlet />
    </>
    );
};

export default Layout;
