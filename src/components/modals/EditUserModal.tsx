import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Badge, Button, Col, Collapse, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { TbArrowBack, TbCheck, TbTrashX } from "react-icons/tb";
import { toast } from "react-toastify";
import { Account, AccountType, Organization } from "../../service/auth";

export const EditUserModal = ({ show, user, handleClose }: { show: boolean; user: Account; handleClose: () => void; }) => {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState(user as Account);

  const queryClient = useQueryClient();

  const { isLoading: isLoadingEdit, mutate: mutateEdit } = useMutation(["users", "edit"], async (data: Partial<Account>) => {
    return axios.post("/users/update", null, { params: { update_user_id: data.id, organization_name: data.organization?.name, ...data } }).then((e) => e.data);
  }, {
    onError(e: any) {
      toast.error("Änderungen konnten nicht gespeichert werden. " + e?.response?.data?.detail);
    },
    onSuccess() {
      toast.success("Änderungen wurden gespeichert.");
      queryClient.invalidateQueries(["users"]);
    }
  });

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation(["users", "edit"], async (data: Partial<Account>) => {
    return axios.post("/users/delete/", data).then((e) => e.data);
  }, {
    onError(e: any) {
      toast.error("Benutzer konnte nicht gelöscht werden. " + e?.response?.data?.detail);
    },
    onSuccess() {
      toast.success("Benutzer wurde gelöscht.");
      queryClient.invalidateQueries(["users"]);
    }
  });

  const { isLoading: isLoadingResetPw, mutate: mutateResetPw } = useMutation(["users", "edit"], async (data: Partial<Account>) => {
    return axios.post("/users/reset-password/", data).then((e) => e.data);
  }, {
    onError(e: any) {
      toast.error("Passwort konnte nicht zurückgesetzt werden. " + e?.response?.data?.detail);
    },
    onSuccess() {
      toast.success("Ein Link zum Passwort zurücksetzen wurde an die hinterlegte E-Mail Adresse gesendet.");
      queryClient.invalidateQueries(["users"]);
    }
  });

  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrgaChange = (e: any) => {
    const organization = { [e.target.name]: e.target.value } as Organization;
    setForm({ ...form, organization });
  };

  const isLoading = isLoadingDelete || isLoadingEdit || isLoadingResetPw;

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
          <Form.Label>ID</Form.Label>
          <Form.Control disabled={true} type="text" value={form.id} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Vorname</Form.Label>
          <Form.Control disabled={isLoading} type="text" name="first_name" value={form.first_name} onChange={handleFormChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nachname</Form.Label>
          <Form.Control disabled={isLoading} type="text" name="last_name" value={form.last_name} onChange={handleFormChange} />
        </Form.Group>
        <Form.Label>E-Mail Adresse</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control disabled={isLoading} type="email" name="email" value={form.email} onChange={handleFormChange} />
          {!user.email_verified ? <Badge className="d-flex align-items-center" bg="warning">unverifiziert</Badge> :
            <Badge className="d-flex align-items-center" bg="success">verifiziert</Badge>}
        </InputGroup>
        <Form.Group className="mb-3">
          <Form.Label>Organisation</Form.Label>
          <Form.Control disabled={isLoading} type="text" placeholder="" name="name" value={form.organization.name} onChange={handleOrgaChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Rolle</Form.Label>
          <Form.Select disabled={isLoading} aria-label="Default select example" name="permission" value={form.permission} onChange={handleFormChange}>
            {(Object.keys(AccountType) as Array<keyof typeof AccountType>).filter(v => isNaN(v as unknown as number)).map((key) => <option key={key} value={AccountType[key]}>{key}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            label="Account gesperrt"
            name="disabled"
            disabled={isLoading}
            checked={form.disabled}
            onChange={() => setForm(old => ({ ...old, disabled: !old.disabled }))} />
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
  </Modal>;

};
