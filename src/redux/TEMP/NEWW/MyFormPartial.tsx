import React from "react";
import { Col, InputGroup } from "react-bootstrap";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { CheckerFormFieldElement, NumberFormFieldElement, SelectFormFieldElement } from "./FormFieldElements";

export type MyFormPartialProps = {
    methods: UseFormReturn<FieldValues, any>;
};

export const MyFormPartial = (props: MyFormPartialProps) => {
    const { methods } = props;
    return (
        <FormProvider {...methods}>
            <InputGroup as={Col} md={2}>
                <NumberFormFieldElement field="ИмяПоляОдин" />
                <NumberFormFieldElement field="ИмяПоля2" />
                <CheckerFormFieldElement field="Chbox" />
                <SelectFormFieldElement field="SELTy" selectOpts={["One", "Two", "Three"]} />
            </InputGroup>
        </FormProvider>
    );
};
