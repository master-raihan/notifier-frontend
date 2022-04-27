import {all} from 'redux-saga/effects';
import userSaga from "./Sagas/userSaga";
import billSaga from "./Sagas/billSaga";
import categorySaga from "./Sagas/categorySaga";
import notificationSaga from "./Sagas/notificationSaga";

export default function* rootSaga(){
    yield all([
        userSaga(),
        billSaga(),
        categorySaga(),
        notificationSaga()
    ]);
}