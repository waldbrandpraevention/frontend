import React from 'react';
import "../assets/styles/App.css"
import Header from '../components/header'
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router-dom';
import styled from "styled-components";
import { Button } from 'react-bootstrap';
import { FaBars, FaCogs } from 'react-icons/fa';
import { AiOutlinePieChart } from 'react-icons/ai';
import { TbAbacus, TbAlignJustified, TbBuilding, TbInfoCircle, TbInfoSquare, TbLayoutDashboard, TbMap, TbPolygon, TbServer, TbSettings, TbShield, TbUser } from 'react-icons/tb';

const FlexMain = styled.div`
  display: flex;
/*   height: calc(100vh - 64px); */
  direction: ltr;
  justify-content: flex-start;
`

const StyledMain = styled.div`
/*   max-height: 100vh; */
/*   overflow-y: scroll; */
width: -webkit-fill-available;
`

const App = () => {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } = useProSidebar();

  return (<>
    <Header />

    <FlexMain>
      <Sidebar >
        <Menu closeOnClick={true}>
          <MenuItem icon={<TbAlignJustified />} onClick={() => collapseSidebar()}></MenuItem>
          <MenuItem routerLink={<Link to="/dashboard"/>} icon={<TbLayoutDashboard />}> Dashboard </MenuItem>
          <MenuItem routerLink={<Link to="/zones"/>} icon={<TbPolygon />}> Zonen </MenuItem>
          <MenuItem routerLink={<Link to="/map"/>} icon={<TbMap />}> Karte </MenuItem>
          <MenuItem routerLink={<Link to="/advanced"/>} icon={<TbAbacus />}> Analyse </MenuItem>
          <SubMenu icon={<TbSettings />} label="Einstellungen">
            <MenuItem routerLink={<Link to="/settings/account"/>} icon={<TbUser />}> Account </MenuItem>
            <MenuItem routerLink={<Link to="/settings/system"/>} icon={<TbServer />}> System </MenuItem>
          </SubMenu>
          <SubMenu icon={<TbInfoCircle />} label="Info">
            <MenuItem routerLink={<Link to="/datenschutz"/>} icon={<TbShield />}> Datenschutz </MenuItem>
            <MenuItem routerLink={<Link to="/impressum"/>}icon={<TbBuilding />}> Impressum </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      <StyledMain>
        <Outlet />
      </StyledMain>
    </FlexMain>
  </>);
}

export default App;
