import "../assets/styles/header.css"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import BellIcon from "./bellIcon"
import Colormode from "./colormode";
import styled from "styled-components";
import { TbLogout, TbUserCircle } from "react-icons/tb";
import Logo from "../assets/img/Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../service/auth";

const MyNavbar = styled(Navbar)`
    height: 32px !important;
    background-color: var(--bs-dark);
    z-index: 1;
`
const MyLogo = styled(Logo)`
    width: 24px;
    height: 24px;
`

const MyNavLink = styled(Nav.Link)`
    :hover {
        background-color: var(--bs-primary)
    }
`

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return <>
        <MyNavbar variant="dark">
            <Container>
                <Navbar.Brand>
                    <Nav.Link style={{ display: "flex" }}>
                        <MyLogo />
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <MyNavLink><Colormode /></MyNavLink>
                        <MyNavLink><BellIcon hasNotifications={true} /></MyNavLink>
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
