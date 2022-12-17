import { ImSpinner2 } from "react-icons/im";
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

const StyledSpinner = styled(ImSpinner2)`
    height: 32px;
    width: 32px;
    rotate: 0deg;
    animation: spinnerspin 1s infinite linear;

    @keyframes spinnerspin {
        from {transform:rotate(0deg);}
        to {transform:rotate(359deg);}
    }
`;

const Loading = () => {
    return <Main>
        <StyledLogo />
        <StyledSpinner />
    </Main>
}
export default Loading;