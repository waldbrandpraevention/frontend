import { useState } from "react";
import { Nav } from "react-bootstrap";
import '../assets/styles/sidebar.css'
import Logo from "../assets/img/logo.svg"

type SidebarProps = { visible?: boolean }

const Sidebar = (props: SidebarProps) => {
    const [visible, setVisible] = useState(props.visible ?? true);
    return <> {visible && <Nav className="col-md-12 d-none d-md-block bg-light sidebar "
        activeKey="/home">
        <img src={Logo} alt="KiWI" className="image"></img>
        <div className="sidebar-sticky"></div>
        <Nav.Item>
            <Nav.Link className="text-dark" href="/dashbord">Dashbord</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link className="text-dark" eventKey="zonenliste">Zonen</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link className="text-dark" eventKey="analyse">Analyse</Nav.Link>
        </Nav.Item>
        <hr className="mt-5 mb-0"></hr>
        <Nav.Item>
            <Nav.Link className="text-dark" eventKey="einstelungen">Einstelungen</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link className="text-dark" eventKey="impressung">Impressung</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link className="text-dark" eventKey="datenschutz">Datenschutz</Nav.Link>
        </Nav.Item>
    </Nav>}</>


};

export default Sidebar

