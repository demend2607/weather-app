import { Link } from "react-router-dom";

import "./general.scss";

export default function Header() {
  return (
    <header>
      <div className="bg" />
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
          <li className="menu__item">
            <Link to="/trekbag">Trekbag</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
