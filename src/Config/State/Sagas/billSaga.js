import {call, all, put, takeEvery} from 'redux-saga/effects';
import {
    createBillApi,
    deleteBillApi,
    getAllBillApi,
    getReportBillApi,
    updateBillApi
} from "../../../services/bill.service";
import {
    createBillFailed,
    createBillSuccess,
    updateBillFailed,
    updateBillSuccess,
    getAllBillFailed,
    getAllBillSuccess,
    deleteBillSuccess, deleteBillFailed, getReportBillSuccess, getReportBillFailed
} from "../reducers/billSlice";


function* getAllBillSaga(action) {
    try{
        const response = yield call(getAllBillApi, action.payload);
        if(response.data.success){
            yield put(getAllBillSuccess(response.data));
        }
    }catch(error){
        yield put(getAllBillFailed(error.response.data));
    }
}

function* getReportBillSaga(action) {
    try{
        const response = yield call(getReportBillApi, action.payload);
        if(response.data.success){
            yield put(getReportBillSuccess(response.data));
        }
    }catch(error){
        yield put(getReportBillFailed(error.response.data));
    }
}

function* createBillSaga(action) {
    try {
        const response = yield call(createBillApi, action.payload);
        if (response.data.success) {
            yield put(createBillSuccess(response.data));
        }

    } catch (error) {
        yield put(createBillFailed(error.response.data));
    }
}

function* updateBillSaga(action) {
    try{
        const response = yield call(updateBillApi, action.payload);
        if(response.data.success){
            yield put(updateBillSuccess(response.data));
        }
    }catch(error){
        yield put(updateBillFailed(error.response.data));
    }
}

function* deleteBillSaga(action) {
    try{
        const response = yield call(deleteBillApi, { id: action.payload.id });
        if(response.data.success){
            yield put(deleteBillSuccess({ id: action.payload.id }));
        }
    }catch(error){
        yield put(deleteBillFailed(error.response.data));
    }
}

function* billWatcher() {
    yield takeEvery('bill/getAllBill', getAllBillSaga);
    yield takeEvery('bill/getReportBill', getReportBillSaga);
    yield takeEvery('bill/createBill', createBillSaga);
    yield takeEvery('bill/updateBill', updateBillSaga);
    yield takeEvery('bill/deleteBill', deleteBillSaga);
}

export default function* billSaga() {
    yield all([billWatcher()])
}