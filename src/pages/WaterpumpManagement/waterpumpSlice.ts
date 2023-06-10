import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import dataApi from 'api/dataApi';
import moment from 'moment';
import {IDeviceData} from 'pages/model';

const initialState: {
  waterpumpData: IDeviceData[];
} = {
  waterpumpData: []
};

export const getWaterpumpData = createAsyncThunk('waterpump/getData', async () => {
  const res = await dataApi.getWaterpumpData();
  return res;
});

export const postPumpData = createAsyncThunk('waterpump/postData', async (data: {value: number}) => {
  const res = await dataApi.changePumpData(data);
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

const waterpump = createSlice({
  name: 'waterpump',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(getWaterpumpData.fulfilled, (state, action: PayloadAction<any>) => {
      state.waterpumpData = transformData(action.payload);
    });
  }
});

const {reducer} = waterpump;
export default reducer;
