import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { TbBell } from "react-icons/tb";
import AlertManagerForm from "../components/tiles/AlertManagerForm";
import AlertsList from "../components/tiles/AlertsList";

const Alerts = () => {
  const [show, setShow] = useState(false)

  return (
    <Container style={{maxWidth: "50em"}}>
      <AlertManagerForm show={show} handleClose={() => setShow(false)} />
      <div className="my-2" style={{ float: "left" }}>
        <Button onClick={() => setShow(s => !s)} className="d-flex align-items-center"><TbBell></TbBell> Einstellungen</Button>
      </div>
      <AlertsList />
    </Container>
  )
}

export default Alerts