import React from "react";
import { NavLink } from "react-router-dom";

const Menu = props => {
  let menuClass = "menu";
  if (props.menuOpen) {
    menuClass = "menu mobileMenu";
  }

  return (
    <nav className={menuClass}>
      <ul>
        <li>
          <NavLink to="/" className="li">
            Game
          </NavLink>
        </li>
        <li>
          <NavLink to="/results" className="li">
            Results
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
