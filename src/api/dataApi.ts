import axiosClient from './axiosClient';

const dataApi = {
  getWaterpumpData: () => {
    const url = '/api/v2/harrygooner/feeds/pump/data';
    return axiosClient.get(url);
  },
  getLEDdata: () => {
    const url = '/api/v2/harrygooner/feeds/led/data';
    return axiosClient.get(url);
  },
  changeLedData: (data: {value: number}) => {
    const url = '/api/v2/harrygooner/feeds/led/data';
    return axiosClient.post(url, data, {headers: {'X-AIO-Key': 'aio_SvVG04BTJ4bmlwP6XuF2UKgPghV7'}});
  },
  changePumpData: (data: {value: number}) => {
    const url = '/api/v2/harrygooner/feeds/pump/data';
    return axiosClient.post(url, data, {headers: {'X-AIO-Key': 'aio_SvVG04BTJ4bmlwP6XuF2UKgPghV7'}});
  },
  getTemperatureData: () => {
    const url = '/api/v2/harrygooner/feeds/temperature/data';
    return axiosClient.get(url);
  },
  getMoistureData: () => {
    const url = '/api/v2/harrygooner/feeds/moisture/data';
    return axiosClient.get(url);
  },
  getTemperatureLastData: () => {
    const url = '/api/v2/harrygooner/feeds/temperature';
    return axiosClient.get(url);
  },
  getMoistureLastData: () => {
    const url = '/api/v2/harrygooner/feeds/moisture';
    return axiosClient.get(url);
  }
};

export default dataApi;
