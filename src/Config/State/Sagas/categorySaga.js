import {call, all, put, takeEvery} from 'redux-saga/effects';
import {createCategoryApi, deleteCategoryApi, getAllCategoryApi} from "../../../services/category.service";
import {
    createCategoryFailed,
    createCategorySuccess, deleteCategoryFailed,
    deleteCategorySuccess,
    getAllCategoryFailed,
    getAllCategorySuccess
} from "../reducers/categorySlice";
import {deleteBillApi} from "../../../services/bill.service";
import {deleteBillFailed, deleteBillSuccess} from "../reducers/billSlice";


function* getAllCategorySaga(action) {
    try{
        const response = yield call(getAllCategoryApi, action.payload);
        if(response.data.success){
            yield put(getAllCategorySuccess(response.data));
        }
    }catch(error){
        yield put(getAllCategoryFailed(error.response.data));
    }
}

function* createCategorySaga(action) {
    try{
        const response = yield call(createCategoryApi, action.payload);
        if(response.data.success){
            yield put(createCategorySuccess(response.data));
        }
    }catch(error){
        yield put(createCategoryFailed(error.response.data));
    }
}

function* deleteCategorySaga(action) {
    try{
        const response = yield call(deleteCategoryApi, { id: action.payload.id });
        if(response.data.success){
            yield put(deleteCategorySuccess({ id: action.payload.id }));
        }
    }catch(error){
        yield put(deleteCategoryFailed(error.response.data));
    }
}

function* categoryWatcher() {
    yield takeEvery('category/getAllCategory', getAllCategorySaga);
    yield takeEvery('category/createCategory', createCategorySaga);
    yield takeEvery('category/deleteCategory', deleteCategorySaga);
}

export default function* categorySaga() {
    yield all([categoryWatcher()])
}