import "../assets/styles/header.css"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import BellIcon from "./BellIcon"
import Colormode from "./Colormode";
import styled from "styled-components";
import { TbLogout, TbUserCircle } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../service/auth";
import { useColorStore } from "../stores/ColorStore";

const MyNavbar = styled(Navbar)`
    height: 32px !important;
    /* background-color: #ff7043; */
    z-index: 10;
    position: absolute;
    width: 100%;
    width: -webkit-fill-available;
    width: -moz-available;
`

const MyNavLink = styled(Nav.Link)`
    :hover {
        background-color: var(--bs-primary)
    }
`

const MyColormode = styled(Colormode)`
    background: "black";
`;

const MyBellIcon = styled(BellIcon)`
    background: "black";
`;

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const headerBg = useColorStore(state => state.headerBackground);

    return <>
        <MyNavbar variant="light" style={{ background: headerBg }}>
            <Container>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <MyNavLink><MyColormode iconDark /></MyNavLink>
                        <MyNavLink><MyBellIcon iconDark hasNotifications={false} /></MyNavLink>
                        <NavDropdown title={user.firstname} id="basic-nav-dropdown" align={"end"}>
                            <NavDropdown.Item className="d-flex align-items-center" onClick={() => navigate("/settings/account")}>
                                <TbUserCircle /> Account
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item className="d-flex align-items-center text-danger" onClick={() => { logout(); navigate("/login") }}>
                                <TbLogout /> Abmelden
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </MyNavbar>
    </>
};
export default Header
