import React from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    
    <nav className="navbar sticky-top navbar-expand-lg navbar-style  ">
       <h2 className="navbar-brand px-2 logo-name" href="#">
         MEAL-SHARING
        </h2>
      <div className="container-sm justify-content-end ">
       
        <ul className="navbar-nav ml-auto ">
          <li className="nav-item">
          <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
          <Link to="/meals" className="nav-link">
              Meals
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
