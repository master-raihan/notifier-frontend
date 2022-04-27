import {call, all, put, takeEvery} from 'redux-saga/effects';
import {loginUserFailed, loginUserSuccess, registerUserFailed, registerUserSuccess, logoutUserFailed, logoutUserSuccess} from "../reducers/userSlice";
import {userLoginApi, userLogoutApi, userRegistrationApi} from "../../../services/user.service";

function* userLoginSaga(action) {
    try{
        const response = yield call(userLoginApi, action.payload);
        if(response.data.success){
            localStorage.setItem("access_token", response.data.data.access_token);
            yield put(loginUserSuccess(response.data));
        }
    }catch(error){
        yield put(loginUserFailed(error.response.data));
    }
}

function* userRegisterSaga(action) {
    try{
        const response = yield call(userRegistrationApi, action.payload);
        if(response.data.success){
            localStorage.setItem("access_token", response.data.data.access_token);
            yield put(registerUserSuccess(response.data));
        }
    }catch(error){
        yield put(registerUserFailed(error.response.data));
    }
}

function* userLogoutSaga(action){
    try{
        localStorage.removeItem("access_token");
        yield put(logoutUserSuccess());
    }catch (error){
        yield put(logoutUserFailed(error.response.data));
    }
}

function* userWatcher() {
    yield takeEvery('user/loginUser', userLoginSaga);
    yield takeEvery('user/registerUser', userRegisterSaga);
    yield takeEvery('user/logoutUser', userLogoutSaga);
}

export default function* userSaga() {
    yield all([userWatcher()])
}