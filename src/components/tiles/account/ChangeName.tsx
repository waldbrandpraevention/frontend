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
import { useAuth } from "../../../service/auth";

type ChangeFormData = {
    first_name: string;
    last_name: string;
};


const ChangeName = () => {
    const { user } = useAuth()

    const [form, setForm] = useState({
        first_name: "",
        last_name: ""
    } as ChangeFormData);

    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation(["account", "changename"], (data: ChangeFormData) => {
        return axios.post("/users/me/update", null, { params: data }).then((e) => e.data); /* demo url */
    }, {
        onSuccess() {
            queryClient.invalidateQueries(["account"])
            toast.success("Name wurde erfolgreich geändert.")
        },
        onError() {
            toast.error("Name konnte nicht geändert werden.")
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
            <Card.Title>Name ändern</Card.Title>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={4}>
                        Vorname
                    </Form.Label>
                    <Col md={8}>
                        <Form.Control
                            className="col-lg-*"
                            type="text"
                            placeholder={user.firstname}
                            name="first_name"
                            value={form.first_name}
                            onChange={handleFormChange}
                            disabled={isLoading}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column md={4}>
                        Nachname
                    </Form.Label>
                    <Col md={8}>
                        <Form.Control
                            className="col-lg-*"
                            type="text"
                            placeholder={user.lastname}
                            name="last_name"
                            value={form.last_name}
                            onChange={handleFormChange}
                            disabled={isLoading}
                        />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner></LoadingSpinner> : <>Name ändern</>}
                </Button>
            </Form>
        </Tile>
    );
};

export default ChangeName;
