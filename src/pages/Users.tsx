import { SetStateAction, useState } from "react"
import { Badge, Button, Card, Col, Collapse, Container, Form, InputGroup, Modal, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap"
import { TbAlertTriangle, TbBan, TbCheck, TbCopy, TbLink, TbMailFast, TbTrashX, TbUserPlus } from "react-icons/tb"
import { Account, AccountType } from "../service/auth"

const dummyData: Account[] = [
  { firstname: "foo", lastname: "bar", mail: "foo@bar.de", organization: "KIWA", mail_verified: true, permission: 2, disabled: false, isAdmin: true, isUser: false },
  { firstname: "foo", lastname: "bar", mail: "foo1@bar.de", organization: "KIWA", mail_verified: false, permission: 1, disabled: false, isAdmin: false, isUser: true },
  { firstname: "foo", lastname: "bar", mail: "foo2@bar.de", organization: "KIWA", mail_verified: false, permission: 1, disabled: true, isAdmin: false, isUser: true },
]

const CreateUserModal = ({ show, handleClose }: { show: boolean, handleClose: () => void }) => {
  const onCreate = () => {

  }
  return <Modal
    show={show}
    onHide={handleClose}
    // backdrop="static"
    keyboard={true}
    animation={false}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Benutzer einladen</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" >
          <Form.Label>E-Mail Adresse</Form.Label>
          <Form.Control type="email" placeholder="" />
          <Form.Text className="text-muted">
            Nur notwendig bei E-Mail Einladung. Ein Einladungslink wird an diese E-Mail Adresse gesendet.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Organisation</Form.Label>
          <Form.Control type="text" placeholder="" />
          <Form.Text className="text-muted">
            Der Benutzer wird dieser Organisaton beitreten.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Rolle</Form.Label>
          <Form.Select aria-label="Default select example" >
            {(Object.keys(AccountType) as Array<keyof typeof AccountType>).filter(v => isNaN(v as unknown as number)).map((key) =>
              <option value={AccountType[key]}>{key}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Check
            type="switch"
            id="custom-switch"
            checked={true}
            label="Account sofort aktivieren"
          />
        </Form.Group>
        <div className="d-grid gap-2 mt-2">
          <Button className="d-flex align-items-center justify-content-center" variant="success" onClick={onCreate}><TbMailFast /> Einladen per E-Mail</Button>
        </div>
        <hr />
        Alternativ können Sie einen Einladungslink erstellen um eine Person einzuladen. Dieser Link ist nur <b>einmalig</b> gültig.
        <div className="d-grid gap-2 mt-2">
          <Button className="d-flex align-items-center justify-content-center" variant="success" onClick={onCreate}><TbLink /> Einladungslink generieren</Button>
        </div>
        <InputGroup className="mt-2" >
          <Form.Control disabled type="text" placeholder="" />
          <Button variant="outline-secondary" className="d-flex align-items-center">
            <TbCopy></TbCopy>
          </Button>
        </InputGroup>
      </Form>
    </Modal.Body>
  </Modal>

}

const EditUserModal = ({ show, user, handleClose }: { show: boolean, user: Account, handleClose: () => void }) => {
  const [open, setOpen] = useState(false);
  const onCreate = () => {

  }
  return <Modal
    show={show}
    onHide={handleClose}
    // backdrop="static"
    keyboard={true}
    animation={false}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Benutzer bearbeiten</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Vorname</Form.Label>
          <Form.Control type="text" value={user.firstname} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nachname</Form.Label>
          <Form.Control type="text" value={user.lastname} />
        </Form.Group>
        <Form.Label>E-Mail Adresse</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control type="email" value={user.mail} />
          {!user.mail_verified ? <Badge className="d-flex align-items-center" bg="warning">unverifiziert</Badge> :
            <Badge className="d-flex align-items-center" bg="success">verifiziert</Badge>}
        </InputGroup>
        <Form.Group className="mb-3">
          <Form.Label>Organisation</Form.Label>
          <Form.Control type="text" value={user.organization} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Rolle</Form.Label>
          <Form.Select aria-label="Default select example">
            {(Object.keys(AccountType) as Array<keyof typeof AccountType>).filter(v => isNaN(v as unknown as number)).map((key) =>
              <option selected={AccountType[key] === user.permission} value={AccountType[key]}>{key}</option>)}
          </Form.Select>
        </Form.Group>
        <div className="d-grid gap-2 mt-2">
          <Button className="d-flex align-items-center justify-content-center" variant="light" onClick={() => setOpen(o => !o)}>
            Erweiterte Einstellungen {!open ? "anzeigen" : "verbergen"}
          </Button>
        </div>
        <Collapse in={open}>
          <Row className="mt-2">
            <Col>
              <div className="d-grid ">
                <Button className="d-flex align-items-center justify-content-center" variant="outline-danger" onClick={onCreate}><TbBan /> Deaktivieren</Button>
              </div>
            </Col>
            <Col>
              <div className="d-grid ">
                <Button className="d-flex align-items-center justify-content-center" variant="outline-danger" onClick={onCreate}><TbTrashX /> Entfernen</Button>
              </div>
            </Col>
          </Row>
        </Collapse>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="light" onClick={handleClose}>
        Abbrechen
      </Button>
      <Button variant="success" onClick={handleClose} className="d-flex align-items-center">
        <TbCheck></TbCheck> Speichern
      </Button>
    </Modal.Footer>
  </Modal>

}

const Users = () => {
  const [user, setUser] = useState({} as Account)
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [editUser, setEditUser] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return <Container>
    {/* <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={false}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                Some text as placeholder. In real life you can have the elements you
                have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
        </Offcanvas> */}

    <CreateUserModal show={newUser} handleClose={() => setNewUser(false)}></CreateUserModal>
    <EditUserModal user={user} show={editUser} handleClose={() => { setUser({} as Account); setEditUser(false) }}></EditUserModal>

    <Card body className="mt-2 my-1 shadow-sm border-0">
      <Button className="d-flex align-items-center" variant="success" onClick={() => { setNewUser(true) }}><TbUserPlus /> Benutzer einladen</Button>
    </Card>
    <Row>
      <Col /* md={8} */>
        <Card body className="my-1 shadow-sm border-0">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Vorname</th>
                <th>Nachname</th>
                <th>E-Mail</th>
                <th>Organisation</th>
                <th>Rolle</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map(u => <tr key={u.mail} style={{ cursor: "pointer" }} onClick={() => { setUser(u); setEditUser(true) }}>
                <td>1</td>
                <td>{u.firstname}</td>
                <td>{u.lastname}</td>
                <td>{u.mail} {!u.mail_verified && <OverlayTrigger
                  placement={"top"}
                  overlay={
                    <Tooltip>
                      E-Mail Adresse wurde (noch) nicht bestätigt.
                    </Tooltip>
                  }
                >
                  <span><TbAlertTriangle color="orange"></TbAlertTriangle></span>
                </OverlayTrigger>}</td>
                <td>{u.organization}</td>
                <td>{AccountType[u.permission]}</td>
                <td>{u.disabled ? <Badge bg="danger">Gesperrt</Badge> : <Badge bg="success">Aktiv</Badge>}</td>
              </tr>)}
            </tbody>
          </Table>
        </Card>
      </Col>
      {/* <Col md={4}>
                <Card body className="my-1 shadow-sm border-0">

                </Card>
            </Col> */}
    </Row>


  </Container>
}
export default Users