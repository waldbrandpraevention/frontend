import { useState } from "react";
import { Nav } from "react-bootstrap";
import '../assets/styles/sidebar.css'
import Logo from "../assets/img/Logo"
import { AiOutlinePieChart } from 'react-icons/ai'
import { GrMap } from 'react-icons/gr'
import { BsGearFill, BsListUl } from 'react-icons/bs'
import { DiGoogleAnalytics } from 'react-icons/di'
import { MdOutlinePrivacyTip } from 'react-icons/md'


type SidebarProps = { visible?: boolean }

const Sidebar = (props: SidebarProps) => {
    const [visible] = useState(props.visible ?? true);
    return <> {visible && <Nav className="col-md-12 d-none d-md-block bg-light sidebar "
        activeKey="/home">
        <Logo className="image" />
        <div className="sidebar-sticky"></div>
        <Nav.Item>
            <Nav.Link className="text-dark" href="/dashbord"><AiOutlinePieChart className="svg" /> Dashbord</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link className="text-dark" eventKey="zonenliste"><BsListUl className="svg" />Zonen</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link className="text-dark" eventKey="analyse"><DiGoogleAnalytics className="svg" />Analyse</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link className="text-dark" eventKey="map"><GrMap className="svg" />Karte</Nav.Link>
        </Nav.Item>
        <hr className="mt-5 mb-0"></hr>
        <Nav.Item>
            <Nav.Link className="text-dark" eventKey="einstelungen"><BsGearFill className="svg" />Einstelungen</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link className="text-dark" eventKey="impressung"><BsGearFill className="svg" />Impressung</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link className="text-dark" eventKey="datenschutz"><MdOutlinePrivacyTip className="svg" />Datenschutz</Nav.Link>
        </Nav.Item>
    </Nav>}</>


};

export default Sidebar

