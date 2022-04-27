import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    categories: [],
    errors: null
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getAllCategory: (state) => {
            state.isLoading = true;
        },
        getAllCategorySuccess: (state, action) => {
            state.isLoading = false;
            state.categories = action.payload.data;
            state.isLoggedIn  = true;
        },
        getAllCategoryFailed: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload.message;
        },
        createCategory: (state) => {
            state.isLoading = true;
        },
        createCategorySuccess: (state, action) => {
            state.isLoading = false;
            state.categories = [...state.categories, action.payload.data];
            state.isLoggedIn  = true;
        },
        createCategoryFailed: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload.message;
        },
        deleteCategory: (state) => {
            state.isLoading = true;
        },
        deleteCategorySuccess: (state, action) => {
            state.isLoading = false;
            state.categories = state.categories.filter((category)=> category.id !== action.payload.id);
            state.isLoggedIn  = true;
        },
        deleteCategoryFailed: (state, action) => {
            state.isLoading = false;
            state.errors = action.payload.message;
        }
    }
});

export const { getAllCategory, getAllCategorySuccess, getAllCategoryFailed, createCategory, createCategorySuccess, createCategoryFailed, deleteCategory, deleteCategorySuccess, deleteCategoryFailed } = categorySlice.actions;

export default categorySlice.reducer;