import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import OkAlert from "../../alerts/OkAlert";
import LoadingSpinner from "../../LoadingSpinner";
import Tile from "../../Tile";
import ErrorAlert from "../../alerts/ErrorAlert";

type ChangeFormData = {
    newMail: string;
};


const ChangeMail = () => {
    const [form, setForm] = useState({
        newMail: "",
    } as ChangeFormData);

    const queryClient = useQueryClient();

    const { isLoading, isError, isSuccess, mutate } = useMutation(["account", "changemail"], (data: ChangeFormData) => {
        return axios.post("https://httpbin.org/post", data).then((e) => e.data); /* demo url */
    }, { onSuccess: () => queryClient.invalidateQueries(["account"]) });

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        mutate(form);
    };

    const handleFormChange = (e: any) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Tile className="my-3">
            <Card className="border-0">
                <Card.Body>
                    <Card.Title>E-Mail ändern</Card.Title>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column md={4}>
                                Neue E-Mail
                            </Form.Label>
                            <Col md={8}>
                                <Form.Control
                                    className="col-lg-*"
                                    type="Mail"
                                    placeholder=""
                                    name="oldMail"
                                    value={form.newMail}
                                    onChange={handleFormChange}
                                    disabled={isLoading}
                                />
                            </Col>
                        </Form.Group>


                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? <LoadingSpinner></LoadingSpinner> : <>E-Mail ändern</>}
                        </Button>

                        {isError && (
                            <ErrorAlert>
                                Fehler :/.
                            </ErrorAlert>
                        )}
                        {isSuccess && (
                            <OkAlert>
                                Eine Bestätigungs E-Mail wurde an die neue Adresse gesendet.
                            </OkAlert>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </Tile>
    );
};

export default ChangeMail;
