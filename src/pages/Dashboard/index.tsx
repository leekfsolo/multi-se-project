import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {handleLoading} from 'app/globalSlice';
import {dashboardSelector} from 'app/selectors';
import DashboardMainView, {DashboardMainViewProps} from './DashboardMainView';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {getMoistureData, getMoistureLastData, getTemperatureData, getTemperatureLastData} from './dashboardSlice';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const dashboard = useAppSelector(dashboardSelector);

  const getLineChartOptions = () => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            pointStyleWidth: 8,
            useBorderRadius: true,
            boxHeight: 6,
            color: '#333',
            font: {
              size: 15,
              family: 'Inter, sans-serif'
            }
          }
        },
        tooltip: {
          usePointStyle: true
        },
        title: {
          padding: {
            bottom: 16
          }
        }
      },
      scales: {
        x: {
          grid: {display: false}
        },
        y: {
          ticks: {display: true, stepSize: 20, padding: 20},
          grid: {drawTicks: false},
          border: {width: 0, dash: [4, 2]},
          max: 100
        }
      }
    };
  };

  const getChartDataset = (data: number[], label: string, borderColor: string) => {
    return {
      labels: Array(24)
        .fill(0)
        .map((_, i) => i),
      datasets: [
        {
          label,
          data,
          fill: false,
          borderColor,
          backgroundColor: '#fff',
          borderWidth: 2,
          tension: 0.4
        }
      ]
    };
  };

  useEffect(() => {
    dispatch(handleLoading(true));

    try {
      const fetchData = async () => {
        await dispatch(getTemperatureData());
        await dispatch(getMoistureData());
        await dispatch(getTemperatureLastData());
        await dispatch(getMoistureLastData());
        dispatch(handleLoading(false));
      };

      fetchData();
    } catch (err) {
      console.error(err);
      dispatch(handleLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const interval = setInterval(() => {
        const fetchData = async () => {
          await dispatch(getTemperatureLastData());
          await dispatch(getMoistureLastData());
        };

        fetchData();
      }, 10000);

      return () => clearInterval(interval);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const dashboardMainViewProps: DashboardMainViewProps = {
    dashboardData: dashboard,
    getLineChartOptions,
    getChartDataset
  };

  return <DashboardMainView {...dashboardMainViewProps} />;
};

export default Dashboard;
