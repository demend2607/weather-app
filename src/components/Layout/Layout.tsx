import { Outlet, Link } from "react-router-dom";

import  "./layout.scss";
const Layout = () => {
  return (
    <>
    <nav className="menu">
      <ul className="menu__list">
        <li className="menu__item">
          <Link to="/">Home</Link>
        </li>
        <li className="menu__item">
          <Link to="/weather">Weather</Link>
        </li>
        <li className="menu__item">
          <Link to="/counter">Counter</Link>
        </li>
        <li className="menu__item">
          <Link to="/writter">Writter</Link>
        </li>
      </ul>
    </nav>
      <Outlet />
    </>
  );
};
export default Layout;
