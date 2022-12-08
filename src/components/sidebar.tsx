import { useState } from "react";
import { Nav } from "react-bootstrap";
import '../assets/styles/sidebar.css'
import Logo from "../assets/img/Logo"
import { AiOutlinePieChart } from 'react-icons/ai'
import { GrMap } from 'react-icons/gr'
import { BsGearFill, BsListUl } from 'react-icons/bs'
import { DiGoogleAnalytics } from 'react-icons/di'
import { MdOutlinePrivacyTip } from 'react-icons/md'
import { ImSection, ImCross } from 'react-icons/im'
import { FaBars } from 'react-icons/fa'
import { Link } from "react-router-dom";




const Sidebar = () => {
    const [openMenu, setOpenMenu] = useState(true);

    const handleClick = () => {
        setOpenMenu(!openMenu);

    };

    return <> {openMenu ? true && <Nav className="col-md-12 d-none d-md-block bg-light sidebar "
        activeKey="/home">
        <ImCross className="maximised" onClick={handleClick} />
        <Logo as={Link} to="/" className="image" />
        <div className="sidebar-sticky"></div>
        <Nav.Item>
            <Nav.Link as={Link} to="/dashboard" className="text-dark"><AiOutlinePieChart className="svg" />Dashboard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={Link} to="/zones" className="text-dark" eventKey="zonenliste"><BsListUl className="svg" />Zonen</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={Link} to="/advanced" className="text-dark" eventKey="analyse"><DiGoogleAnalytics className="svg" />Analyse</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={Link} to="/map" className="text-dark" eventKey="map"><GrMap className="svg" />Karte</Nav.Link>
        </Nav.Item>
        <hr className="mt-5 mb-0"></hr>
        <Nav.Item>
            <Nav.Link as={Link} to="/settings" className="text-dark" eventKey="einstellungen"><BsGearFill className="svg" />Einstellungen</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={Link} to="/impressum" className="text-dark" eventKey="impressum"><ImSection className="svg" />Impressum</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link as={Link} to="/datenschutz" className="text-dark" eventKey="datenschutz"><MdOutlinePrivacyTip className="svg" />Datenschutz</Nav.Link>
        </Nav.Item>
    </Nav>
        : <FaBars className="minimised" onClick={handleClick} />}
    </>


};

export default Sidebar

