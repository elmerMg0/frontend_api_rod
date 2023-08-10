import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import { PublicRoutes } from '../models/routes';
const AuthGuard = () => {
    const user = useSelector(store => store.user);
    return user.username ? <Outlet/> : <Navigate replace to={PublicRoutes.LOGIN}/>
}

export default AuthGuard