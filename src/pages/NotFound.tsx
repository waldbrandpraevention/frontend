import { Button } from "react-bootstrap";
import { TbHome } from "react-icons/tb";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Logo from "../assets/img/logo.webp";

const Main = styled.div`
    background: var(--bs-gray-200);
    height: 100vh;
    width: 100%;
    align-items: center;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
`

const NotFound = () => {
    const navigate = useNavigate();

    return <Main>
        <img src={Logo} alt="Logo"  className="image mb-2" width="64px" height="64px" />
        <h1>Seite nicht gefunden</h1>
        <Button onClick={() => navigate("/")} className="mt-2 d-flex align-items-center" variant="outline-primary"><TbHome></TbHome> Zur Startseite</Button>
    </Main>
}
export default NotFound;