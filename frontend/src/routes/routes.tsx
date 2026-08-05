import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { DataRoutesAlterarSenha, DataRoutesHome, DataRoutesLock, DataRoutesLogin, DataRoutesLogout, DataRoutesSetup } from './dataroutes';
import Login from '../view/login/login';
import Lock from '../view/lock/lock';
import Home from '../view/home/home';
import { storageGetWSHost, storageGetWSTimeout, storageGetWSToken } from '../utils/storage';
import Logout from '../view/logout/logout';
import Api from '../base/services/api';


interface RequireAuthProps { }

const RequireAuth: React.FC<RequireAuthProps> = (props) => {
   const { authState } = useAuthContext();

   return (
      authState.logged && !authState.lock ?
         <Outlet /> :
         authState.lock ?
            <Fragment><Navigate to={DataRoutesLock.path} replace /></Fragment> :
            authState.logout ?
               <Fragment><Navigate to={DataRoutesLogout.path} replace /></Fragment> :
               <Fragment><Navigate to={DataRoutesLogin.path} replace /></Fragment>
   );
}

const BrowserRoutes: React.FC = () => {
   useEffect(() => {
      if (!Api.getInstance().conn()) {
         Api.getInstance().create(
            storageGetWSHost(),
            storageGetWSTimeout()
         );
      }
      Api.getInstance().token(storageGetWSToken());
   }, []);

   return (
      <BrowserRouter basename='/cpmodelo'>
         <Routes>
            <Route path={DataRoutesLogin.path} element={<Login />} />
            <Route path={DataRoutesLogout.path} element={<Logout />} />
            <Route path={DataRoutesLock.path} element={<Lock />} />
            <Route path={DataRoutesHome.path} element={<RequireAuth />}>
               <Route path={DataRoutesHome.path} element={<Home />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default BrowserRoutes;