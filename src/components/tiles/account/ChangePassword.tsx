import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import OkAlert from "../../alerts/OkAlert";
import LoadingSpinner from "../../LoadingSpinner";
import Tile from "../../Tile";
import ErrorAlert from "../../alerts/ErrorAlert";

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

    const { isLoading, isError, isSuccess, mutate } = useMutation(["changepassword"], (data: ChangeFormData) => {
        return axios.post("https://httpbin.org/post", data).then((e) => e.data); /* demo url */
    }
    );

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        mutate(form);
    };

    const handleFormChange = (e: any) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Tile>
            <Card className="border-0">
                <Card.Body>
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

                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? <LoadingSpinner></LoadingSpinner> : <>Passwort ändern</>}
                        </Button>

                        {isError && (
                            <ErrorAlert>
                                Fehler :/.
                            </ErrorAlert>
                        )}
                        {isSuccess && (
                            <OkAlert>
                                Passwort wurde geändert.
                            </OkAlert>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </Tile>
    );
};

export default ChangePassword;
