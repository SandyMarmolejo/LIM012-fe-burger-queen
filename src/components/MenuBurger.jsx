import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import menuBurger from '../images/menu_burger.png';

const Menu = ({ toggled }) => {
  const { x } = useSpring({
    x: toggled ? 0 : 100,
  });

  return (
    <animated.div
      className="nav-wrapper"
      style={{ transform: x.interpolate((y) => `translate3d(${y * -1}%, 0, 0)`) }}
    >
      <nav>
        <Link to="/">Ir a Inicio</Link>
        <Link to="/menu">Menú</Link>
        <Link to="/deliver">Entregar pedidos</Link>
        <Link to="/kitchen">Cocina</Link>
      </nav>
    </animated.div>
  );
};

const MenuBurger = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggledHandler = () => {
    setIsToggled(!isToggled);
  };

  return (
    <>
      <Menu toggled={isToggled} />
      <div className="menu-burger">
        <button className="cover" onClick={toggledHandler}>
          <img src={menuBurger} className="button-burger" alt="burger" />
        </button>
      </div>
    </>
  );
};

export default MenuBurger;
