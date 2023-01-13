import { Button } from "react-bootstrap";
import { TbBug, TbHome } from "react-icons/tb";
import styled from "styled-components";

const Main = styled.div`
    background: var(--bs-gray-200);
    height: 100vh;
    width: 100%;
    align-items: center;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;

    .anim {
      animation-name: a;
      animation-duration: 1s;
      animation-iteration-count: infinite;

      @keyframes a {
        0% {
          color: #D32F2F;
        }

        50% {
          color: black;
        }

        100% {
          color: #D32F2F;
        }
      }
    }
`

const UnexpectedError = ({ err }: { err?: Error }) => {
  return <Main>
    <TbBug size={64} className="anim"></TbBug>
    <h5>Beim Laden dieser Seite ist ein unerwartetes Problem aufgetreten.</h5>
    <p>Sollte dieses Problem weiterhin auftreten, melden Sie dies Ihrem Administrator.</p>
    <code>{err && err.toString()} @ {window.location.pathname}</code>
    <Button onClick={() => window.location.href = "/"} className="mt-2 d-flex align-items-center" variant="outline-primary"><TbHome></TbHome> Zur Startseite</Button>
  </Main>
}
export default UnexpectedError;