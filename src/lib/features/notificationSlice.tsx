import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "@reduxjs/toolkit/query";
import { NotificationTypes } from "@/utils/types";

export type Notification = {
    id: number;
    type: NotificationTypes;
    name: string;
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
        addNotification(state, action: { payload: Omit<Notification, "id"> }) {
            state.notificationState = [
                ...state.notificationState,
                { ...action.payload, id: state.notificationState.length + 1 },
            ];
        },
        removeNotification(state, action: { payload: number }) {
            state.notificationState = state.notificationState.filter(
                (notification) => notification.id !== action.payload
            );
        },
    },
});

export const { addNotification, removeNotification } =
    notificationSlice.actions;

export default notificationSlice.reducer;
