import '../assets/styles/header.css'
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Sidebar from './sidebar'
import ProfileIcon from './profileIcon'
import BellIcon from './bellIcon'
import Colormode from './colormode';
import styled from 'styled-components';
import { TbBell, TbUserCircle } from 'react-icons/tb';

const MyNavbar = styled(Navbar)`
    height: 32px !important;
`

const Header = () => {
    return <>
        <MyNavbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">WB</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link><Colormode /></Nav.Link>
                        <Nav.Link><BellIcon hasNotifications={true} /></Nav.Link>
                        <Nav.Link><TbUserCircle size={"1.5em"} className="text-white" /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </MyNavbar>
    </>


};
export default Header
