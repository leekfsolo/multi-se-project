import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import dataApi from 'api/dataApi';
import moment from 'moment';
import {IDeviceData} from 'pages/model';

const initialState: {
  lightData: IDeviceData[];
} = {
  lightData: []
};

export const getLightData = createAsyncThunk('light/getData', async () => {
  const res = await dataApi.getLEDdata();
  return res;
});

export const postLightData = createAsyncThunk('light/postData', async (data: {value: number}) => {
  const res = await dataApi.changeLedData(data);
  return res;
});

const transformData = (responseData: any): IDeviceData[] => {
  return responseData.map((data: any, idx: number) => {
    const {value, created_at, created_epoch} = data;

    return {
      id: idx + 1,
      status: value === '0' ? 'off' : 'on',
      created_at: created_at ? moment(created_at).format('DD/MM/YYYY hh:mm') : null,
      created_epoch,
      value
    };
  });
};

const light = createSlice({
  name: 'light',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(getLightData.fulfilled, (state, action: PayloadAction<any>) => {
      state.lightData = transformData(action.payload);
    });
  }
});

const {reducer} = light;
export default reducer;
