import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

type Notification = {
    id: number;
    type: string;
    message: string;
};
export type NotificationState = {
    notificationState: Array<Notification>;
};

const initialState: NotificationState = {
    notificationState: [],
};

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification(state, action) {
            state.notificationState = [
                ...state.notificationState,
                { ...action.payload, id: state.notificationState.length + 1 },
            ];
        },
        removeNotification(state, action) {
            state.notificationState = state.notificationState.filter(
                (notification) => notification.id !== action.payload
            );
        },
    },
});

export const { addNotification, removeNotification } =
    notificationSlice.actions;

export const selectNotificationSlice = (state: AppState) =>
    state.notification.notificationState;

export default notificationSlice.reducer;
