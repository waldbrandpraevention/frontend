import React from 'react';
import "../assets/styles/App.css"
import Header from '../components/header'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className="App-body">
      </div>
    </div>
  );
}

export default App;
