import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

export type FieldProps = {
    field: string;
    selectOpts?: string[];
};

export const NumberFormFieldElement = (props: FieldProps) => {
    const { field } = props;
    const { register } = useFormContext();
    return (
        <>
            <InputGroup.Text>{"NumberFormFieldElement"}</InputGroup.Text>
            <Form.Control {...register(field)}></Form.Control>
        </>
    );
};

export const CheckerFormFieldElement = (props: FieldProps) => {
    const { field } = props;
    const { register } = useFormContext();
    return (
        <InputGroup {...register(field)}>
            <InputGroup.Text>{"CheckerFormFieldElement"}</InputGroup.Text>
            <InputGroup.Checkbox name={field} />
        </InputGroup>
    );
};

export const SelectFormFieldElement = (props: FieldProps) => {
    const { field, selectOpts } = props;
    const { register } = useFormContext();
    return (
        <InputGroup>
            <InputGroup.Text>{"SelectFormFieldElement"}</InputGroup.Text>
            <Form.Select {...register(field)}>
                {selectOpts.map((o, cnt) => (
                    <option key={cnt} value={o}>
                        {o}
                    </option>
                ))}
            </Form.Select>
        </InputGroup>
    );
};
