import '../assets/styles/header.css'
import { Container, Nav, Navbar } from "react-bootstrap";
import BellIcon from './bellIcon'
import Colormode from './colormode';
import styled from 'styled-components';
import { TbUserCircle } from 'react-icons/tb';
import Logo from '../assets/img/Logo';
import { redirect } from 'react-router-dom';

const MyNavbar = styled(Navbar)`
    height: 32px !important;
    opacity: 0.9;
    background-color: var();
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
    return <>
        <MyNavbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Nav.Link style={{display:"flex"}}>
                        <MyLogo />
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <MyNavLink><Colormode /></MyNavLink>
                        <MyNavLink><BellIcon hasNotifications={true} /></MyNavLink>
                        <MyNavLink onClick={() => alert("X")}><TbUserCircle size={"1.5em"} className="text-white" /></MyNavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </MyNavbar>
    </>


};
export default Header
