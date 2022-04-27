import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    notifications: [],
    errors: null
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        getAllNotification: (state) => {
            state.isLoading = true;
        },
        getAllNotificationSuccess: (state, action) => {
            state.isLoading = false;
            state.notifications = action.payload.data;
            state.isLoggedIn  = true;
        },
        getAllNotificationFailed: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload.message;
        }
    }
});

export const { getAllNotification, getAllNotificationSuccess, getAllNotificationFailed } = notificationSlice.actions;

export default notificationSlice.reducer;