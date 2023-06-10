import {RootState} from './store';

export const globalSelector = (state: RootState) => state.global;

export const authSelector = (state: RootState) => state.auth;

export const waterpumpSelector = (state: RootState) => state.waterpump;

export const lightSelector = (state: RootState) => state.lightManagement;

export const dashboardSelector = (state: RootState) => state.dashboard;
