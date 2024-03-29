import "../assets/styles/App.css";
import Header from '../components/Header';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar, menuClasses } from 'react-pro-sidebar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { TbAlertTriangle, TbBuilding, TbChartAreaLine, TbChevronsLeft, TbChevronsRight, TbColorSwatch, TbFlame, TbInfoCircle, TbLayoutDashboard, TbMap, TbPolygon, TbQuestionMark, TbSettings, TbShield, TbUser, TbUsers } from 'react-icons/tb';
import { useAuth } from "../service/auth";
import ErrorBoundary from "../components/ErrorBoundary";
import { isActiveRoute } from "../utils/util";
import { useColorStore } from "../stores/ColorStore";
import Logo from "../assets/img/logo.webp";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
/*height: calc(100vh - 32px); */
height: 100vh; /* - Navbarheight */
-webkit-transform: translateZ(0); /* fixes https://stackoverflow.com/a/15885486 */
`

const MenuCloseItem = styled(MenuItem)` /* center 'X' icon */
  filter: brightness(85%);
  a {
    span {
      margin: auto;
    }
    span:nth-child(2) {
      display: none;
    }
  }
`

const App = () => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const { user } = useAuth();
  const background = useColorStore(state => state.background)
  const sidebarBackground = useColorStore(state => state.sidebarBackground)
  const sidebarActive = useColorStore(state => state.sidebarActive)
  const sidebarHover = useColorStore(state => state.sidebarHover)
  const sidebarText = useColorStore(state => state.sidebarText)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.email_verified) toast.warn("Sie haben Ihre E-Mail Adresse noch nicht verifiziert", { toastId: "mail_unverified" })
  }, [user.email_verified])

  return (<>
    <ErrorBoundary>
      <FlexMain>
        <Sidebar transitionDuration={0} backgroundColor={sidebarBackground}>
          <Menu closeOnClick={true} menuItemStyles={{
            button: ({ level, active, disabled }) => {
              return {
                color: active ? 'white' : sidebarText,
                backgroundColor: active ? sidebarActive : sidebarBackground,
              };
            },
          }} rootStyles={{
            [`.${menuClasses.button}`]: {
              '&:hover': {
                color: sidebarText,
                backgroundColor: sidebarHover,
              },
            },
            "& > ul:first-child": {
              height: "100vh",
              display: 'flex',
              flexDirection: 'column'
            }
          }}>
            <div className="d-flex align-items-center justify-content-center py-1" style={{}}>
              <img onClick={() => navigate("/")} src={Logo} alt="Logo" width={48} height={48} />
            </div>
            <div style={{ flex: 1 }}>
              <MenuItem active={isActiveRoute("/dashboard")} routerLink={<Link to="/dashboard" />} icon={<TbLayoutDashboard />}> Dashboard </MenuItem>
              <MenuItem active={isActiveRoute("/zones")} routerLink={<Link to="/zones" />} icon={<TbPolygon />}> Zonen </MenuItem>
              <MenuItem active={isActiveRoute("/map")} routerLink={<Link to="/map" />} icon={<TbMap />}> Karte </MenuItem>
              <MenuItem active={isActiveRoute("/alerts")} routerLink={<Link to="/alerts" />} icon={<TbAlertTriangle />}> Alerts </MenuItem>
              {user.isAdmin && <>
                <MenuItem active={isActiveRoute("/incidents")} routerLink={<Link to="/incidents" />} icon={<TbFlame />}> Einsätze </MenuItem>
                <MenuItem active={isActiveRoute("/advanced")} routerLink={<Link to="/advanced" />} icon={<TbChartAreaLine />}> Analyse </MenuItem>
              </>
              }
              <SubMenu icon={<TbSettings />} label="Einstellungen">
                <MenuItem active={isActiveRoute("/settings/account")} routerLink={<Link to="/settings/account" />} icon={<TbUser />}> Account </MenuItem>
                <MenuItem active={isActiveRoute("/settings/design")} routerLink={<Link to="/settings/design" />} icon={<TbColorSwatch />}> Design </MenuItem>
                {user.isAdmin && <MenuItem active={isActiveRoute("/settings/users")} routerLink={<Link to="/settings/users" />} icon={<TbUsers />}> Benutzer </MenuItem>}
              </SubMenu>
            </div>
            <div>
              <SubMenu icon={<TbInfoCircle />} label="Hilfe">
                <MenuItem active={isActiveRoute("/help")} routerLink={<Link to="/help" />} icon={<TbQuestionMark />}> FAQ </MenuItem>
                <MenuItem active={isActiveRoute("/datenschutz")} routerLink={<Link to="/datenschutz" />} icon={<TbShield />}> Datenschutz </MenuItem>
                <MenuItem active={isActiveRoute("/impressum")} routerLink={<Link to="/impressum" />} icon={<TbBuilding />}> Impressum </MenuItem>
              </SubMenu>
              <MenuCloseItem icon={collapsed ? <TbChevronsRight /> : <TbChevronsLeft />} onClick={() => collapseSidebar()}>{!collapsed && <span className="fw-light mx-auto d-flex align-items-center"></span>}</MenuCloseItem>
            </div>
          </Menu>
        </Sidebar>

        <StyledMain style={{ background }}>
          <Header />
          <div style={{ marginTop: "32px" /* - Navbarheight */ }}>
            <Outlet />
          </div>
        </StyledMain>
      </FlexMain>
    </ErrorBoundary>
  </>);
}

export default App;
