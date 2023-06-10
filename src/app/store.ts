import {configureStore} from '@reduxjs/toolkit';
import globalReducer from 'app/globalSlice';
import authReducer from 'pages/Auth/authSlice';
import registerReducer from 'pages/Register/registerSlice';
import waterpumpReducer from 'pages/WaterpumpManagement/waterpumpSlice';
import lightManagementReducer from 'pages/LightManagement/lightManagementSlice';
import dashboardReducer from 'pages/Dashboard/dashboardSlice';

const rootReducer = {
  global: globalReducer,
  auth: authReducer,
  register: registerReducer,
  waterpump: waterpumpReducer,
  lightManagement: lightManagementReducer,
  dashboard: dashboardReducer
};

const store = configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
