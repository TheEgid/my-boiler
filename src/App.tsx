import React from "react";
import { Container } from "react-bootstrap";
import Spinner from "./components/common/Spinner";
import Processor from "./components/common/Processor";

function App() {
    return (
        <>
            <div className="App">
                <Container>
                    <Processor />
                    <Spinner />
                </Container>
            </div>
        </>
    );
}

export default App;
