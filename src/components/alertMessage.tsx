"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    Notification,
    removeNotification,
} from "@/lib/features/notificationSlice";
import Slide, { SlideProps } from "@mui/material/Slide";

type AlertType = "error" | "info" | "success" | "warning";

const AlertMessage = () => {
    const notificationState = useAppSelector(
        (state) => state.notification.notificationState
    );
    const [notificationData, setNotificationData] = React.useState<
        Notification[]
    >([]);
    const dispatch = useAppDispatch();

    const slideTransition = (props: SlideProps) => {
        return <Slide {...props} direction="up" />;
    };

    React.useEffect(() => {
        setNotificationData([...notificationState].reverse());
    }, [notificationState]);

    const handleClose = (
        event: React.SyntheticEvent | Event,
        id: number,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(removeNotification(id));
    };
    return (
        <div className="fixed flex flex-col items-end bottom-4 right-4 z-50">
            {notificationData.slice(0, 5).map((notification, index) => (
                <Snackbar
                    key={notification.id}
                    open={true}
                    autoHideDuration={6000}
                    style={{ bottom: `${15 + index * 64}px` }}
                    TransitionComponent={slideTransition}
                    onClose={(e, reason) =>
                        handleClose(e, notification.id, reason)
                    }>
                    <Alert
                        onClose={(e: React.SyntheticEvent | Event) =>
                            handleClose(e, notification.id)
                        }
                        severity={
                            (notification.type.toLowerCase() as AlertType) ||
                            "warning"
                        }
                        variant="filled"
                        sx={{ width: "100%" }}>
                        {notification.message}
                    </Alert>
                </Snackbar>
            ))}
        </div>
    );
};

export default AlertMessage;
