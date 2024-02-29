import { type AppProps } from "next/app";

import "ol/ol.css";
import "react-toastify/dist/ReactToastify.css";
import "./../globals.scss";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Component {...pageProps} />;
        </>
    );
}
