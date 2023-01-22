import React from "react";
import Container from "react-bootstrap/Container";
import Dog from "../components/Dog";
import { useDocumentTitle } from "../App";

import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { MyFormPartial } from "./NEWW/MyFormPartial";

const DogPage = () => {
    const methods = useForm({});
    const { handleSubmit } = methods;

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <MyFormPartial methods={methods} />

                <Button variant="secondary" type="submit">
                    GO
                </Button>
            </Form>
        </Container>
    );
};

export default DogPage;
