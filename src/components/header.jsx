import React from "react";
import { MdMenu } from "react-icons/md";

const Header = props => (
  <header className="header">
    <MdMenu className="menuIcon" onClick={props.toggleMenu} />
    <p className="headerText">Tic Tac Toe</p>
  </header>
);

export default Header;
