import React from 'react';
import "../assets/styles/App.css"
import Header from '../components/header'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />

      <Sidebar>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
      <header className="App-header">

      </header>
      <div className="App-body">
      </div>
    </div>
  );
}

export default App;
