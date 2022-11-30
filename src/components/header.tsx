import '../assets/styles/header.css'
import { Nav } from "react-bootstrap";
import Sidebar from './sidebar'
import ProfileIcon from './profileIcon'
import BellIcon from './bellIcon'


const Header = () => {
    return <>
        <Nav className="navbar fixed-top ">
            <span className="navbar-icon">
                <Sidebar />
            </span>
            <span className="navbar-icon ms-auto">
                <BellIcon />
            </span>
            <span className="navbar-icon ms-auto mr-3">
                <ProfileIcon />
            </span>
        </Nav>
    </>


};
export default Header
