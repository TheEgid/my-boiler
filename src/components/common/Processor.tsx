import React from "react";
import IDOMParser from "advanced-html-parser";
import { Button } from "react-bootstrap";

const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<req>
<query>Виктор Иван</query>
<count>7</count>
</req>
`;

export const ParseElem = () => {
    const doc2 = IDOMParser.parse(xmlString);
    const attr2 = doc2.documentElement.getElementsByTagName("query"); // query
    const xx = attr2[0] as Element;
    console.log(xx.textContent);
};

const Processor = () => (
    <div>
        <p>Загружаем...</p>
        <Button onClick={() => ParseElem()}> START </Button>
    </div>
);

export default Processor;
