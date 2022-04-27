import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    bills: [],
    reportBills: {},
    errors: null
};

export const billSlice = createSlice({
    name: 'bill',
    initialState,
    reducers: {
        getReportBill: (state) => {
            state.isLoading = true;
        },
        getReportBillSuccess: (state, action) => {
            state.isLoading = false;
            state.reportBills = action.payload.data;
            state.isLoggedIn  = true;
        },
        getReportBillFailed: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload.message;
        },
        getAllBill: (state) => {
            state.isLoading = true;
        },
        getAllBillSuccess: (state, action) => {
            state.isLoading = false;
            state.bills = action.payload.data;
            state.isLoggedIn  = true;
        },
        getAllBillFailed: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload.message;
        },
        createBill: (state) => {
            state.isLoading = true;
        },
        createBillSuccess: (state, action) => {
            state.isLoading = false;
            state.bills = [...state.bills, action.payload.data ];
            state.isLoggedIn  = true;
        },
        createBillFailed: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload.message;
        },
        updateBill: (state) => {
            state.isLoading = true;
        },
        updateBillSuccess: (state, action) => {
            state.isLoading = false;
            state.bills = state.bills.map((bill)=>(bill.id === action.payload.data.id ? { ...bill, ...action.payload.data } : bill));
            state.isLoggedIn  = true;
        },
        updateBillFailed: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload.message;
        },
        deleteBill: (state) => {
            state.isLoading = true;
        },
        deleteBillSuccess: (state, action) => {
            state.isLoading = false;
            state.bills = state.bills.filter((bill)=> bill.id !== action.payload.id);
            state.isLoggedIn  = true;
        },
        deleteBillFailed: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload.message;
        },
        resetBillErrors: (state) => {
            state.errors = null;
        }
    }
});

export const { getReportBill, getReportBillSuccess, getReportBillFailed, getAllBill, getAllBillSuccess, getAllBillFailed, createBill, createBillSuccess, createBillFailed, updateBill, updateBillSuccess, updateBillFailed, deleteBill, deleteBillSuccess, deleteBillFailed, resetBillErrors } = billSlice.actions;

export default billSlice.reducer;