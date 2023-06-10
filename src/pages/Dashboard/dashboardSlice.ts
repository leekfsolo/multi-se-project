import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import dataApi from 'api/dataApi';
import {IDashboardData} from 'pages/interface';

const initialState: IDashboardData = {
  temperatureData: [],
  moistureData: [],
  temperatureLastValue: 0,
  moistureLastValue: 0
};

export const getTemperatureData = createAsyncThunk('dashboard/getTemperatureData', async () => {
  const res = await dataApi.getTemperatureData();
  return res;
});

export const getMoistureData = createAsyncThunk('dashboard/getMoistureData', async () => {
  const res = await dataApi.getMoistureData();
  return res;
});

export const getTemperatureLastData = createAsyncThunk('dashboard/getTemperatureLastData', async () => {
  const res = await dataApi.getTemperatureLastData();
  return res;
});

export const getMoistureLastData = createAsyncThunk('dashboard/getMoistureLastData', async () => {
  const res = await dataApi.getMoistureLastData();
  return res;
});

const transformData = (responseData: any): number[] => {
  const result = Array(24).fill(0);

  for (const data of responseData) {
    const {value, created_at} = data;
    const hour = new Date(created_at).getHours();

    result[hour] = (result[hour] + Number(value)) / 2;
  }

  return result;
};

const dashboard = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders
      .addCase(getTemperatureData.fulfilled, (state, action: PayloadAction<any>) => {
        state.temperatureData = transformData(action.payload);
      })
      .addCase(getMoistureData.fulfilled, (state, action: PayloadAction<any>) => {
        state.moistureData = transformData(action.payload);
      })
      .addCase(getTemperatureLastData.fulfilled, (state, action: PayloadAction<any>) => {
        state.temperatureLastValue = Number(action.payload.last_value);
      })
      .addCase(getMoistureLastData.fulfilled, (state, action: PayloadAction<any>) => {
        state.moistureLastValue = Number(action.payload.last_value);
      });
  }
});

const {reducer} = dashboard;
export default reducer;
