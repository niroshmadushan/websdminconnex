// src/App.js
import React, { useState } from 'react';
import Sidebar from './compo/Sidebar';
import './App.css';

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="App">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      <Sidebar className={isSidebarVisible ? 'sidebar show' : 'sidebar'} />
      <main style={{ marginLeft: isSidebarVisible ? '250px' : '0', padding: '20px' }}>
        <h1 className="title">Welcome to My App</h1>
        <p>Content goes here...</p>
      </main>
    </div>
  );
}

export default App;
