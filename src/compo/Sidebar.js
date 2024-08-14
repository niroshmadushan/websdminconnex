// src/components/Sidebar.js
import React from 'react';
import 'bulma/css/bulma.min.css';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <p className="menu-label">Main Menu</p>
      <ul className="menu-list">
        <li>
          <a className="navbar-item" href="#home">
            <i className="fas fa-home"></i>
            <span className="text">Home</span>
          </a>
        </li>
        <li>
          <a className="navbar-item" href="#about">
            <i className="fas fa-user"></i>
            <span className="text">About</span>
          </a>
        </li>
        <li>
          <a className="navbar-item" href="#services">
            <i className="fas fa-cogs"></i>
            <span className="text">Services</span>
          </a>
        </li>
        <li>
          <a className="navbar-item" href="#contact">
            <i className="fas fa-envelope"></i>
            <span className="text">Contact</span>
          </a>
        </li>
        <li>
          <a className="navbar-item" href="#profile">
            <i className="fas fa-user-circle"></i>
            <span className="text">Profile</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
