import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import styled from "styled-components";
import Logo from "../assets/img/logo.webp";
import { apiRoot } from "../config/config";
import ErrorAlert from "./alerts/ErrorAlert";
import WarnAlert from "./alerts/WarnAlert";

const Main = styled.div`
    background: var(--bs-gray-200);
    @media (prefers-color-scheme: dark) {
        background: var(--bs-gray-900);
    }
    height: 100vh;
    width: 100%;
    align-items: center;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
`

const StyledSpinner = styled(ImSpinner2)`
    height: 32px;
    width: 32px;
    rotate: 0deg;
    animation: spinnerspin 1s infinite linear;
    @media (prefers-color-scheme: dark) {
        color: var(--bs-gray-100);
    }

    @keyframes spinnerspin {
        from {transform:rotate(0deg);}
        to {transform:rotate(359deg);}
    }
`;

const Loading = () => {
    const [state, setState] = useState(0);

    useEffect(() => {
        let ctr = 0;
        const interval = setInterval(() => {
            ctr++;
            if (ctr > 3) { setState(1); }
            if (ctr > 10) { setState(2); return }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <Main>
        <img src={Logo} alt="Logo"  className="image mb-2" width="64px" height="64px" />
        {state !== 2 && <StyledSpinner />}
        {state === 1 && <div className="mt-4"><WarnAlert>Verbindung zur API dauert ungewöhnlich lange</WarnAlert></div>}
        {state === 2 && <div className="mt-4"><ErrorAlert>Verbindung zur API fehlgeschlagen</ErrorAlert></div>}
        <span style={{ position: "fixed", bottom: "2em", fontSize: "12px" }}>Verbinde mit {apiRoot?.includes("http") ? apiRoot : (window.location.host + apiRoot)}</span>
    </Main>
}
export default Loading;