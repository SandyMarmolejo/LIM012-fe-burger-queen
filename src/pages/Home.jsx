import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import iconMenu from '../images/icon_menu.png';
import iconBurger from '../images/icon_burger.png';

function Home() {
  return (
    <div className="home-container">
      <div className="home-logo">
        <img src={logo} className="logo-queen" alt="logo" />
      </div>
      <div className="home-btns">
        <Link to="/menu">
          <button className="home-button">
            <img src={iconMenu} className="icon-home" alt="icon_menu" />
            MENÚ
          </button>
        </Link>
        <Link to="/kitchen">
          <button className="home-button">
            <img src={iconBurger} className="icon-home" alt="icon_burger" />
            COCINA
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
