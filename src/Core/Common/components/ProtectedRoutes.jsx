import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {loginUser} from "../../../Config/State/reducers/userSlice";
import {connect} from "react-redux";

const useAuth=()=>{
    return localStorage.getItem('access_token');
}

const ProtectedRoutes=(props) =>{
    const auth = useAuth();
    return auth?<Outlet/>:<Navigate to="/login"/>
}

const mapStateToProps = (state) =>{
    return { user: state.user }
}

const mapDispatchToProps = (dispatch) =>{
    return { login: (payload)=> dispatch(loginUser(payload)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoutes);