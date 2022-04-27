import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    auth: {},
    isLoggedIn: false,
    errors: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state) => {
            state.isLoading = true
        },
        loginUserSuccess: (state, action) => {
            state.isLoading = false;
            state.auth = action.payload.data;
            state.isLoggedIn  = true;
        },
        loginUserFailed: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload.message
        },
        registerUser: (state) => {
            state.isLoading = true
        },
        registerUserSuccess: (state, action) => {
            state.isLoading = false;
            state.auth = action.payload.data;
            state.isLoggedIn  = true;
        },
        registerUserFailed: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload.message
        },
        logoutUser: (state) => {
            state.isLoading = true
        },
        logoutUserSuccess: (state) => {
            state.isLoading = false;
            state.auth = {};
            state.isLoggedIn = false;
        },
        logoutUserFailed: (state) => {
            state.isLoading = false;
        },
        checkToken: (state) => {
            state.isLoggedIn = !!localStorage.getItem('access_token');
        }
    }
});

export const { loginUser, loginUserSuccess, loginUserFailed, registerUser, registerUserSuccess, registerUserFailed, logoutUser, logoutUserSuccess, logoutUserFailed, checkToken } = userSlice.actions;

export default userSlice.reducer;