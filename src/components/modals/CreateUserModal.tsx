import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { TbCopy, TbLink, TbMailFast } from "react-icons/tb";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner";
import { AccountType } from "../../service/auth";

// const dummyData: Account[] = [
// { id: 1, firstname: "foo", lastname: "bar", mail: "foo@bar.de", organization: { id: 1, name: "KIWA", abbreviation: "KIWA" }, mail_verified: true, permission: 2, disabled: false, isAdmin: true, isUser: false },
// { id: 2, firstname: "Max", lastname: "Mustermann", mail: "max@mustermann.de", organization: { id: 1, name: "KIWA", abbreviation: "KIWA" }, mail_verified: false, permission: 1, disabled: false, isAdmin: false, isUser: true },
// { id: 3, firstname: "Anakin", lastname: "Skywalker", mail: "anakin@skywalker.de", organization: { id: 1, name: "KIWA", abbreviation: "KIWA" }, mail_verified: false, permission: 1, disabled: true, isAdmin: false, isUser: true },
// ]
// const dummyOrgas: Organization[] = [ /* todo: data from api call */
// { id: 1, name: "KIWA", abbreviation: "KIWA" },
// { id: 2, name: "TU Darmstadt", abbreviation: "TUDA" },
// ]
type CreateUserFormData = {
  email?: string;
  organization_name: string;
  permission: AccountType;
  activateNow: boolean;
};
export const CreateUserModal = ({ show, handleClose }: { show: boolean; handleClose: () => void; }) => {
  const [form, setForm] = useState({
    email: "",
    organization_name: "",
    permission: 1,
    activateNow: true
  } as CreateUserFormData);

  const { isLoading: isLoadingEmail, mutate: mutateEmail } = useMutation(["users", "invite", "email"], async (data: CreateUserFormData) => {
    console.log(data);
    return axios.post("/users/invite/email/", data).then((e) => e.data);
  }, {
    onError(e: any) {
      toast.error("Benutzer konnte nicht eingeladen werden. " + e?.response?.data?.detail);
    },
    onSuccess() {
      toast.success("Benutzer wurde erfolgreich eingeladen.");
    }
  });

  const { isLoading: isLoadingLink, mutate: mutateLink } = useMutation(["users", "invite", "link"], async (data: CreateUserFormData) => {
    return axios.post("/users/invite/link/", data).then((e) => e.data);
  }, {
    onError(e: any) {
      // setErrors(e.response.data.detail)
      toast.error("Einladungslink konnte nicht erstellt werden. " + e?.response?.data?.detail);
    },
    onSuccess() {
      toast.success("Einladungslink wurde erstellt.");
    }
  });

  const handleFormChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
        <Form.Group className="mb-3">
          <Form.Label>E-Mail Adresse</Form.Label>
          <Form.Control disabled={isLoadingEmail || isLoadingLink} type="email" placeholder="" name="email" value={form.email} onChange={handleFormChange} />
          <Form.Text className="text-muted">
            Nur notwendig bei E-Mail Einladung. Ein Einladungslink wird an diese E-Mail Adresse gesendet.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Organisation</Form.Label>
          <Form.Control disabled={isLoadingEmail || isLoadingLink} type="text" placeholder="" name="organization_name" value={form.organization_name} onChange={handleFormChange} />
          <Form.Text className="text-muted">
            Der Benutzer wird dieser Organisaton beitreten.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Rolle</Form.Label>
          <Form.Select disabled={isLoadingEmail || isLoadingLink} aria-label="Default select example" name="permission" value={form.permission} onChange={handleFormChange}>
            {(Object.keys(AccountType) as Array<keyof typeof AccountType>).filter(v => isNaN(v as unknown as number)).map((key) => <option key={key} value={AccountType[key]}>{key}</option>)}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            label="Account sofort aktivieren"
            name="activateNow"
            disabled={isLoadingEmail || isLoadingLink}
            checked={form.activateNow}
            onChange={() => setForm(old => ({ ...old, activateNow: !old.activateNow }))} />
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
        <InputGroup className="mt-2">
          <Form.Control disabled type="text" placeholder="" />
          <Button variant="outline-secondary" className="d-flex align-items-center">
            <TbCopy></TbCopy>
          </Button>
        </InputGroup>
      </Form>
    </Modal.Body>
  </Modal>;
};
