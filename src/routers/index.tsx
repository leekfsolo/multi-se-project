import React from 'react';
import {PageUrl} from 'configuration/enum';
import Auth from 'pages/Auth';

import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from 'pages/Dashboard';
import MainLayout from 'components/MainLayout';
import ModalBackdrop from 'components/ModalBackdrop';
import Profile from 'pages/Profile';
import Register from 'pages/Register';
import GlobalLoading from 'components/GlobalLoading';
import {ToastContainer} from 'react-toastify';
import WaterpumpManagement from 'pages/WaterpumpManagement';
import LightManagement from 'pages/LightManagement';

const Routers = () => {
  return (
    <Router>
      <GlobalLoading />
      <ToastContainer theme='colored' />
      <Routes>
        <Route path={PageUrl.LOGIN} element={<Auth />} />
        <Route element={<PrivateRoute />}>
          <Route path={PageUrl.HOME} element={<MainLayout />}>
            <Route index path={PageUrl.DASHBOARD} element={<Dashboard />} />
            <Route path={PageUrl.WATERPUMP} element={<WaterpumpManagement />} />
            <Route path={PageUrl.LED_LIGHT} element={<LightManagement />} />
            <Route path={PageUrl.PROFILE} element={<Profile />} />
            <Route path={PageUrl.CREATE_ACCOUNT} element={<Register />} />
          </Route>
        </Route>
        <Route path={PageUrl.ALL} element={<Navigate to={PageUrl.HOME} replace={true} />} />
      </Routes>
      <ModalBackdrop />
    </Router>
  );
};

export default Routers;
