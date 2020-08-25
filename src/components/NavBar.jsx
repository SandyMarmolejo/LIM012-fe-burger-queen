import React from 'react';
import MenuBurger from './MenuBurger';
import Clock from './Clock';
import logo from '../images/logo.png';

function NavBar(props) {
  return (
    <>
      <nav className="nav-toolbar">
        <MenuBurger />
        <div className="logo">
          <img src={logo} className="logo" alt="logo" />
        </div>

        <div className="nav-order">
          <h1>{props.title}</h1>
        </div>

        <div className="nav-time">
          <h2><Clock /></h2>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
