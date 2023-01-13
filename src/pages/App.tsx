import "../assets/styles/App.css";
import Header from '../components/Header';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, menuClasses } from 'react-pro-sidebar';
import { Link, Outlet } from 'react-router-dom';
import styled from "styled-components";
import { TbAlertTriangle, TbAlignJustified, TbBuilding, TbChartAreaLine, TbFlame, TbInfoCircle, TbLayoutDashboard, TbMap, TbPolygon, TbQuestionMark, TbServer, TbSettings, TbShield, TbUser, TbUsers } from 'react-icons/tb';
import { useAuth } from "../service/auth";
import ErrorBoundary from "../components/ErrorBoundary";
import { isActiveRoute } from "../utils/util";

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
        <Menu closeOnClick={true} menuItemStyles={{
          button: ({ level, active, disabled }) => {
            return {
              color: active ? 'white' : undefined,
              backgroundColor: active ? '#FF7043' : undefined,
            };
          },
        }} rootStyles={{
          [`.${menuClasses.button}`]: {
            '&:hover': {
              backgroundColor: '#FBE9E7',
            },
          },
        }}>
          <MenuItem icon={<TbAlignJustified />} onClick={() => collapseSidebar()}></MenuItem>
          <MenuItem active={isActiveRoute("/dashboard")} routerLink={<Link to="/dashboard" />} icon={<TbLayoutDashboard />}> Dashboard </MenuItem>
          <MenuItem active={isActiveRoute("/zones")} routerLink={<Link to="/zones" />} icon={<TbPolygon />}> Zonen </MenuItem>
          <MenuItem active={isActiveRoute("/map")} routerLink={<Link to="/map" />} icon={<TbMap />}> Karte </MenuItem>
          <MenuItem active={isActiveRoute("/incidents")} routerLink={<Link to="/incidents" />} icon={<TbFlame />}> Einsätze </MenuItem>
          <MenuItem active={isActiveRoute("/alerts")} routerLink={<Link to="/alerts" />} icon={<TbAlertTriangle />}> Alerts </MenuItem>
          {user.isAdmin && <>
            <MenuItem active={isActiveRoute("/advanced")} routerLink={<Link to="/advanced" />} icon={<TbChartAreaLine />}> Analyse </MenuItem>
          </>
          }
          <SubMenu icon={<TbSettings />} label="Einstellungen">
            <MenuItem active={isActiveRoute("/settings/account")} routerLink={<Link to="/settings/account" />} icon={<TbUser />}> Account </MenuItem>
            {user.isAdmin && <MenuItem active={isActiveRoute("/settings/users")} routerLink={<Link to="/settings/users" />} icon={<TbUsers />}> Benutzer </MenuItem>}
            {user.isAdmin && <MenuItem active={isActiveRoute("/settings/system")} routerLink={<Link to="/settings/system" />} icon={<TbServer />}> System </MenuItem>}
          </SubMenu>
          <SubMenu icon={<TbInfoCircle />} label="Hilfe">
            <MenuItem active={isActiveRoute("/help")} routerLink={<Link to="/help" />} icon={<TbQuestionMark />}> FAQ </MenuItem>
            <MenuItem active={isActiveRoute("/datenschutz")} routerLink={<Link to="/datenschutz" />} icon={<TbShield />}> Datenschutz </MenuItem>
            <MenuItem active={isActiveRoute("/impressum")} routerLink={<Link to="/impressum" />} icon={<TbBuilding />}> Impressum </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

      <StyledMain>
        <ErrorBoundary key={Math.random() /* to reset boundary */}>
          <Outlet />
        </ErrorBoundary>
      </StyledMain>
    </FlexMain>
  </>);
}

export default App;
