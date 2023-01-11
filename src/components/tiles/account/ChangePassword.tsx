import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import Tile from "../../Tile";
import { toast } from "react-toastify";

type ChangeFormData = {
    oldpassword: string;
    newpassword1: string;
    newpassword2: string;
};

const ChangePassword = () => {
    const [form, setForm] = useState({
        oldpassword: "",
        newpassword1: "",
        newpassword2: "",
    } as ChangeFormData);

    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation(["account", "changepassword"], (data: ChangeFormData) => {
        return axios.post("https://httpbin.org/post", data).then((e) => e.data); /* demo url */
    }, {
        onSuccess() {
            queryClient.invalidateQueries(["account"])
            toast.success("Passwort wurde erfolgreich geändert.")
        },
        onError() {
            toast.error("Passwort konnte nicht geändert werden.")
        }
    });

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate(form);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Tile>
            <Card.Title>Passwort ändern</Card.Title>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={4}>
                        Altes Passwort
                    </Form.Label>
                    <Col md={8}>
                        <Form.Control
                            className="col-lg-*"
                            type="password"
                            placeholder=""
                            name="oldpassword"
                            value={form.oldpassword}
                            onChange={handleFormChange}
                            disabled={isLoading}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={4}>
                        Neues Passwort
                    </Form.Label>
                    <Col md={8}>
                        <Form.Control
                            className="col-lg-*"
                            type="password"
                            placeholder=""
                            name="newpassword1"
                            value={form.newpassword1}
                            onChange={handleFormChange}
                            disabled={isLoading}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={4}>
                        Neues Passwort wiederholen
                    </Form.Label>
                    <Col md={8}>
                        <Form.Control
                            className="col-lg-*"
                            type="password"
                            placeholder=""
                            name="newpassword2"
                            value={form.newpassword2}
                            onChange={handleFormChange}
                            disabled={isLoading}
                        />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner></LoadingSpinner> : <>Passwort ändern</>}
                </Button>
            </Form>
        </Tile>
    );
};

export default ChangePassword;
