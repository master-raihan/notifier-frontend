import {call, all, put, takeEvery} from 'redux-saga/effects';
import {getAllNotificationApi} from "../../../services/notification.service";
import {getAllNotificationFailed, getAllNotificationSuccess} from "../reducers/notificationSlice";


function* getAllNotificationSaga(action) {
    try{
        const response = yield call(getAllNotificationApi, action.payload);
        if(response.data.success){
            yield put(getAllNotificationSuccess(response.data));
        }
    }catch(error){
        yield put(getAllNotificationFailed(error.response.data));
    }
}

function* notificationWatcher() {
    yield takeEvery('notification/getAllNotification', getAllNotificationSaga);
}

export default function* notificationSaga() {
    yield all([notificationWatcher()])
}