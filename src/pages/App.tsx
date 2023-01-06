import "../assets/styles/App.css";
import Header from '../components/header';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router-dom';
import styled from "styled-components";
import { TbAlertTriangle, TbAlignJustified, TbBuilding, TbChartAreaLine, TbFlame, TbInfoCircle, TbLayoutDashboard, TbMap, TbPolygon, TbQuestionMark, TbServer, TbSettings, TbShield, TbUser, TbUsers } from 'react-icons/tb';
import { useAuth } from "../service/auth";

const FlexMain = styled.div`
  display: flex;
  direction: ltr;
  justify-content: flex-start;
`

const StyledMain = styled.div`
width: 100%;
width: -webkit-fill-available;
width: -moz-available;
overflow-y: scroll;
height: calc(100vh - 32px); /* - Navbarheight */
`

const App = () => {
  const { collapseSidebar } = useProSidebar();
  const { user } = useAuth();

  return (<>
    <Header />

    <FlexMain>
      <Sidebar>
        <Menu closeOnClick={true}>
          <MenuItem icon={<TbAlignJustified />} onClick={() => collapseSidebar()}></MenuItem>
          <MenuItem routerLink={<Link to="/dashboard" />} icon={<TbLayoutDashboard />}> Dashboard </MenuItem>
          <MenuItem routerLink={<Link to="/zones" />} icon={<TbPolygon />}> Zonen </MenuItem>
          <MenuItem routerLink={<Link to="/map" />} icon={<TbMap />}> Karte </MenuItem>
          <MenuItem routerLink={<Link to="/incidents" />} icon={<TbFlame />}> Einsätze </MenuItem>
          <MenuItem routerLink={<Link to="/alerts" />} icon={<TbAlertTriangle />}> Alerts </MenuItem>
          {user.isAdmin && <>
            <MenuItem routerLink={<Link to="/advanced" />} icon={<TbChartAreaLine />}> Analyse </MenuItem>
          </>
          }
          <SubMenu icon={<TbSettings />} label="Einstellungen">
            <MenuItem routerLink={<Link to="/settings/account" />} icon={<TbUser />}> Account </MenuItem>
            {user.isAdmin && <MenuItem routerLink={<Link to="/settings/users" />} icon={<TbUsers />}> Benutzer </MenuItem>}
            {user.isAdmin && <MenuItem routerLink={<Link to="/settings/system" />} icon={<TbServer />}> System </MenuItem>}
          </SubMenu>
          <SubMenu icon={<TbInfoCircle />} label="Hilfe">
            <MenuItem routerLink={<Link to="/help" />} icon={<TbQuestionMark />}> FAQ </MenuItem>
            <MenuItem routerLink={<Link to="/datenschutz" />} icon={<TbShield />}> Datenschutz </MenuItem>
            <MenuItem routerLink={<Link to="/impressum" />} icon={<TbBuilding />}> Impressum </MenuItem>
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
