import '../assets/styles/header.css'
import { Container, Nav, Navbar } from "react-bootstrap";
import Sidebar from './sidebar'
import ProfileIcon from './profileIcon'
import BellIcon from './bellIcon'
import Colormode from './colormode';


const Header = () => {
    return <>
        <Navbar bg="secondary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Waldbrandprävention</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Colormode />
                        <Colormode />
                    </Navbar.Text>
                    <Navbar.Text>
                        <Colormode />
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Nav className="navbar fixed-top " style={{ display: "none" }}>
            <span className="navbar-icon">
                {/* <Sidebar /> */}
            </span>
            <span className="navbar-icon ms-auto">
                <Colormode />
            </span>
            <span className="navbar-icon ms-auto">
                <BellIcon visible={true} />
            </span>
            <span className="navbar-icon ms-auto mr-3">
                <ProfileIcon />
            </span>
        </Nav>
    </>


};
export default Header
