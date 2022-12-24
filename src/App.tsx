import React from "react";
import { Container } from "react-bootstrap";
import Spinner from "./components/common/Spinner";

function App() {
    return (
        <>
            <div className="App">
                <Container>
                    <Spinner />
                </Container>
            </div>
        </>
    );
}

export default App;
