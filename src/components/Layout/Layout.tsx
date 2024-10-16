import { Outlet, Link } from "react-router-dom";

import Footer from "./Footer";
import Container from "./Container";

import "./general.scss";
const Layout = () => {
  return (
    <>
      <header>
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
            <li className="menu__item">
              <Link to="/word-analytics">Word Analytic</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Container />
      <Footer />
    </>
  );
};
export default Layout;
