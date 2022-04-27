import {combineReducers} from 'redux';
import userReducer  from "./reducers/userSlice";
import billReducer from "./reducers/billSlice";
import categoryReducer from "./reducers/categorySlice";
import notificationReducer from "./reducers/notificationSlice";

export default combineReducers({
    user: userReducer,
    bill: billReducer,
    category: categoryReducer,
    notification: notificationReducer
});