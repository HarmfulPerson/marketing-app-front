import TextField from "@mui/material/TextField";
import { ChangeEventHandler, EventHandler, MouseEventHandler } from "react";
import Button from "@mui/material/Button";

type Props = {
    onClick?: MouseEventHandler<HTMLButtonElement>;
    buttonText: string;
    className: string;
};

const SubmitButton = (props: Props) => {
    const { onClick, buttonText, className } = props;

    return (
        <Button
            variant="contained"
            type="submit"
            className={className}
            onClick={onClick}>
            {buttonText}
        </Button>
    );
};

export default SubmitButton;
