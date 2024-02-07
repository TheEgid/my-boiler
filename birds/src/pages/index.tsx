import React from "react";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css"; // import first
import { Button, Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

export default function Home() {
    return (
        <>
            <ToastContainer />
            <Head>
                <title>Приложение</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <div className="hello">
                    <div className="chil">Привет от птиц</div>

                    <Button variant="secondary" onClick={(e) => e}>
                        Нажми меня
                    </Button>
                </div>
            </Container>
        </>
    );
}
