import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById("root")!); // notice the '!'

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
