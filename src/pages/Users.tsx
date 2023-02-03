import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { Badge, Button, Card, Col, Container, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap"
import { TbAlertTriangle, TbUserPlus } from "react-icons/tb"
import ErrorAlert from "../components/alerts/ErrorAlert"
import LoadingTile from "../components/tiles/LoadingTile"
import { Account, AccountType } from "../service/auth"
import { EditUserModal } from "../components/modals/EditUserModal"
import { CreateUserModal } from "../components/modals/CreateUserModal"

const Users = () => {
  const [user, setUser] = useState<Account>({} as Account)
  const [newUser, setNewUser] = useState(false);
  const [editUser, setEditUser] = useState(false);

  const { data, isLoading, isError, isSuccess } = useQuery<Account[]>(["users"], () => {
    return axios.get("/users/all/").then(e => e.data)
  });

  return <Container>
    <CreateUserModal show={newUser} handleClose={() => setNewUser(false)}></CreateUserModal>
    {editUser && <EditUserModal user={user} show={editUser} handleClose={() => { setUser({} as Account); setEditUser(false) }}></EditUserModal>}

    <Row className="mt-2 my-1">
      <div>
        <Button className="d-flex align-items-center float-start" variant="success" onClick={() => { setNewUser(true) }}><TbUserPlus /> Benutzer einladen</Button>
      </div>
    </Row>
    <Row>
      <Col /* md={8} */>
        {isError && <ErrorAlert>Benutzer konnten nicht geladen werden.</ErrorAlert>}
        {isLoading ? <LoadingTile></LoadingTile> : isSuccess &&
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
                {data.map(u => <tr key={u.email} style={{ cursor: "pointer" }} onClick={() => { setUser(u); setEditUser(true) }}>
                  <td>{u.id}</td>
                  <td>{u.first_name}</td>
                  <td>{u.last_name}</td>
                  <td>{u.email} {!u.email_verified && <OverlayTrigger
                    placement={"top"}
                    overlay={<Tooltip>E-Mail Adresse wurde (noch) nicht bestätigt.</Tooltip>}>
                    <span><TbAlertTriangle color="orange"></TbAlertTriangle></span>
                  </OverlayTrigger>}</td>
                  <td>{u.organization.name}</td>
                  <td>{AccountType[u.permission]}</td>
                  <td>{u.disabled ? <Badge bg="danger">Gesperrt</Badge> : <Badge bg="success">Aktiv</Badge>}</td>
                </tr>)}
              </tbody>
            </Table>
          </Card>}
      </Col>
    </Row>
  </Container>
}
export default Users