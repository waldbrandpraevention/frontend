import '../assets/styles/header.css'
import { Container, Nav, Navbar } from "react-bootstrap";
import BellIcon from './bellIcon'
import Colormode from './colormode';
import styled from 'styled-components';
import { TbUserCircle } from 'react-icons/tb';
import Logo from '../assets/img/Logo';

const MyNavbar = styled(Navbar)`
    height: 32px !important;
    opacity: 0.9;
    background-color: var();
`
const MyLogo = styled(Logo)`
    width: 24px;
    height: 24px;
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
