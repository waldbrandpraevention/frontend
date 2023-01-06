import { Button } from "react-bootstrap";
import { TbHome } from "react-icons/tb";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Logo from "../assets/img/Logo";

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

const StyledLogo = styled(Logo)`
    height: 64px;
    width: 64px;
    margin-bottom: 2em;
`

const NotFound = () => {
    const navigate = useNavigate();

    return <Main>
        <StyledLogo />
        <h1><b>404</b> | Seite nicht gefunden</h1>
        <Button onClick={() => navigate("/")} className="mt-2 d-flex align-items-center" variant="outline-primary"><TbHome></TbHome> Zur Startseite</Button>
    </Main>
}
export default NotFound;