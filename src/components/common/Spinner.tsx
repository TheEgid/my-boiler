import React from "react";
import { Circles } from "react-loader-spinner";

interface SpinnerProps {
    height?: number;
    width?: number;
}

const Spinner = ({ height = 100, width = 100 }: SpinnerProps) => (
    <div className="spinner">
        <p>Загружаем...</p>
        <Circles color="#778899" height={height} width={width} />
    </div>
);

export default Spinner;
