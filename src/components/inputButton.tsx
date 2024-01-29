import TextField from "@mui/material/TextField";
import { ChangeEventHandler } from "react";

type Props = {
    id?: string;
    required?: boolean;
    label?: string;
    onChange: ChangeEventHandler;
    value: string;
    type?: string;
    className?: string;
};

const InputButton = (props: Props) => {
    const { id, required, label, onChange, value, type, className } = props;
    return (
        <TextField
            required={required}
            id={id}
            type={type}
            label={label}
            onChange={onChange}
            value={value}
            className={className}
        />
    );
};

export default InputButton;
