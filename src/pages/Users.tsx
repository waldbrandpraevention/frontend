import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { Badge, Button, Card, Col, Collapse, Container, Form, InputGroup, Modal, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap"
import { TbAlertTriangle, TbArrowBack, TbCheck, TbCopy, TbLink, TbMailFast, TbTrashX, TbUserPlus } from "react-icons/tb"
import { toast } from "react-toastify"
import LoadingSpinner from "../components/LoadingSpinner"
import { Account, AccountType } from "../service/auth"

const dummyData: Account[] = [
  { firstname: "foo", lastname: "bar", mail: "foo@bar.de", organization: "KIWA", mail_verified: true, permission: 2, disabled: false, isAdmin: true, isUser: false },
  { firstname: "Max", lastname: "Mustermann", mail: "max@mustermann.de", organization: "KIWA", mail_verified: false, permission: 1, disabled: false, isAdmin: false, isUser: true },
  { firstname: "Anakin", lastname: "Skywalker", mail: "anakin@skywalker.de", organization: "KIWA", mail_verified: false, permission: 1, disabled: true, isAdmin: false, isUser: true },
]

type CreateUserFormData = {
  email?: string,
  organization: string,
  permission: AccountType,
  activateNow: boolean
}

const CreateUserModal = ({ show, handleClose }: { show: boolean, handleClose: () => void }) => {
  const [form, setForm] = useState({
    email: "",
    organization: "",
    permission: 1,
    activateNow: true
  } as CreateUserFormData);

  const { isLoading: isLoadingEmail, mutate: mutateEmail } = useMutation(["users", "invite", "email"], async (data: CreateUserFormData) => {
    console.log(data);
    return axios.post("/users/invite/email/", data).then((e) => e.data);
  }, {
    onError(e: any) {
      // setErrors(e.response.data.detail)
      toast.error("Benutzer konnte nicht eingeladen werden.")
    },
    onSuccess() {
      toast.success("Benutzer wurde erfolgreich eingeladen.")
    }
  });

  const { isLoading: isLoadingLink, mutate: mutateLink } = useMutation(["users", "invite", "link"], async (data: CreateUserFormData) => {
    return axios.post("/users/invite/link/", data).then((e) => e.data);
  }, {
    onError(e: any) {
      // setErrors(e.response.data.detail)
      toast.error("Einladungslink konnte nicht erstellt werden.")
    },
    onSuccess() {
      toast.success("Einladungslink wurde erstellt.")
    }
  });

  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          <Form.Control disabled={isLoadingEmail || isLoadingLink} type="email" placeholder="" name="email" value={form.email} onChange={handleFormChange} />
          <Form.Text className="text-muted">
            Nur notwendig bei E-Mail Einladung. Ein Einladungslink wird an diese E-Mail Adresse gesendet.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Organisation</Form.Label>
          <Form.Control disabled={isLoadingEmail || isLoadingLink} type="text" placeholder="" name="organization" value={form.organization} onChange={handleFormChange} />
          <Form.Text className="text-muted">
            Der Benutzer wird dieser Organisaton beitreten.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Rolle</Form.Label>
          <Form.Select disabled={isLoadingEmail || isLoadingLink} aria-label="Default select example" name="permission" value={form.permission} onChange={handleFormChange} >
            {(Object.keys(AccountType) as Array<keyof typeof AccountType>).filter(v => isNaN(v as unknown as number)).map((key) =>
              <option key={key} value={AccountType[key]}>{key}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            label="Account sofort aktivieren"
            name="activateNow"
            disabled={isLoadingEmail || isLoadingLink}
            checked={form.activateNow}
            onChange={() => setForm(old => ({ ...old, activateNow: !old.activateNow }))}
          />
          <Form.Text className="text-muted">
            Andernfalls wird der Account im Gesperrt-Status erstellt und muss erst nach Registrierung durch einen Administrator aktiviert werden.
          </Form.Text>
        </Form.Group>
        <div className="d-grid gap-2 mt-2">
          <Button disabled={isLoadingEmail} className="d-flex align-items-center justify-content-center" variant="success" onClick={() => mutateEmail(form)}>
            {!isLoadingEmail ? <><TbMailFast /> Einladen per E-Mail</> : <LoadingSpinner />}
          </Button>
        </div>
        <hr />
        Alternativ können Sie einen Einladungslink erstellen um eine Person einzuladen. Dieser Link ist nur <b>einmalig</b> gültig.
        <div className="d-grid gap-2 mt-2">
          <Button disabled={isLoadingLink} className="d-flex align-items-center justify-content-center" variant="success" onClick={() => mutateLink(form)}>
            {!isLoadingLink ? <> <TbLink /> Einladungslink generieren</> : <LoadingSpinner />}
          </Button>
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

  const [form, setForm] = useState(/* {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    disabled: false,
    permission: 1,
  } */ user as Partial<Account>);

  const { isLoading: isLoadingEdit, mutate: mutateEdit } = useMutation(["users", "edit"], async (data: Partial<Account>) => {
    return axios.post("/users/edit/", data).then((e) => e.data);
  }, {
    onError(e: any) {
      // setErrors(e.response.data.detail)
      toast.error("Änderungen konnten nicht gespeichert werden.")
    },
    onSuccess() {
      toast.success("Änderungen wurden gespeichert.")
    }
  });

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(["users", "edit"], async (data: Partial<Account>) => {
    return axios.post("/users/delete/", data).then((e) => e.data);
  }, {
    onError(e: any) {
      // setErrors(e.response.data.detail)
      toast.error("Benutzer konnte nicht gelöscht werden.")
    },
    onSuccess() {
      toast.success("Benutzer wurde gelöscht.")
    }
  });

  const { isLoading: isLoadingResetPw, mutate: mutateResetPw } = useMutation(["users", "edit"], async (data: Partial<Account>) => {
    return axios.post("/users/reset-password/", data).then((e) => e.data);
  }, {
    onError(e: any) {
      // setErrors(e.response.data.detail)
      toast.error("Passwort konnte nicht zurückgesetzt werden.")
    },
    onSuccess() {
      toast.success("Ein Link zum Passwort zurücksetzen wurde an die hinterlegte E-Mail Adresse gesendet.")
    }
  });

  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const isLoading = isLoadingDelete || isLoadingEdit || isLoadingResetPw

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
          <Form.Control disabled={isLoading} type="text" name="firstname" value={user.firstname} onChange={handleFormChange}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nachname</Form.Label>
          <Form.Control disabled={isLoading} type="text" name="lastname" value={user.lastname} onChange={handleFormChange}/>
        </Form.Group>
        <Form.Label>E-Mail Adresse</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control disabled={isLoading} type="email" name="mail" value={user.mail} onChange={handleFormChange}/>
          {!user.mail_verified ? <Badge className="d-flex align-items-center" bg="warning">unverifiziert</Badge> :
            <Badge className="d-flex align-items-center" bg="success">verifiziert</Badge>}
        </InputGroup>
        <Form.Group className="mb-3">
          <Form.Label>Organisation</Form.Label>
          <Form.Control disabled={isLoading} type="text" name="organization" value={user.organization} onChange={handleFormChange}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Rolle</Form.Label>
          <Form.Select disabled={isLoading} aria-label="Default select example"  name="permission" value={form.permission} onChange={handleFormChange}>
            {(Object.keys(AccountType) as Array<keyof typeof AccountType>).filter(v => isNaN(v as unknown as number)).map((key) =>
              <option key={key} selected={AccountType[key] === user.permission} value={AccountType[key]}>{key}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            label="Account gesperrt"
            name="disabled"
            disabled={isLoading}
            checked={form.disabled}
            onChange={() => setForm(old => ({ ...old, disabled: !old.disabled }))}
          />
          <Form.Text className="text-muted">
            Der Account ist aktuell {form.disabled ? "deaktiviert. Anmeldung ist nicht mehr möglich." : "aktiviert."}
          </Form.Text>
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
                <Button disabled={isLoading} className="d-flex align-items-center justify-content-center" variant="outline-danger" onClick={() => mutateResetPw(form)}><TbArrowBack /> Passwort zurücksetzen</Button>
              </div>
            </Col>
            <Col>
              <div className="d-grid ">
                <Button disabled={isLoading} className="d-flex align-items-center justify-content-center" variant="outline-danger" onClick={() => mutateDelete(form)}><TbTrashX /> Entfernen</Button>
              </div>
            </Col>
          </Row>
        </Collapse>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button disabled={isLoading} variant="light" onClick={handleClose}>
        Abbrechen
      </Button>
      <Button disabled={isLoading} variant="success" onClick={() => mutateEdit(form)} className="d-flex align-items-center">
        <TbCheck></TbCheck> Speichern
      </Button>
    </Modal.Footer>
  </Modal>

}

const Users = () => {
  const [user, setUser] = useState({} as Account)
  const [newUser, setNewUser] = useState(false);
  const [editUser, setEditUser] = useState(false);

  return <Container>
    <CreateUserModal show={newUser} handleClose={() => setNewUser(false)}></CreateUserModal>
    <EditUserModal user={user} show={editUser} handleClose={() => { setUser({} as Account); setEditUser(false) }}></EditUserModal>

    {/* <Card body className="mt-2 my-1 shadow-sm border-0"> */}
    <Row className="mt-2 my-1">
      <div>
        <Button className="d-flex align-items-center float-start" variant="success" onClick={() => { setNewUser(true) }}><TbUserPlus /> Benutzer einladen</Button>
      </div>
    </Row>
    {/* </Card> */}
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