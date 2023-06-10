import React from 'react';
import {Line} from 'react-chartjs-2';
import {IDashboardData} from '../interface';
import {Progress, ProgressProps} from 'antd';
export interface DashboardMainViewProps {
  dashboardData: IDashboardData;
  getLineChartOptions: () => any;
  getChartDataset: (data: number[], label: string, borderColor: string) => any;
}

const DashboardMainView = (props: DashboardMainViewProps) => {
  const {dashboardData, getLineChartOptions, getChartDataset} = props;
  const {moistureData, temperatureData, moistureLastValue, temperatureLastValue} = dashboardData;

  const chartDisplay = [
    {
      line: {data: getChartDataset(temperatureData, 'Temperature', '#eb0e15'), options: getLineChartOptions()},
      pie: {
        value: temperatureLastValue * 2,
        type: 'circle',
        startColor: '#ef9834',
        endColor: '#f22128',
        title: 'Current Temperature',
        format: (value: number | undefined) => (value ? `${(value * 50) / 100}℃` : '')
      }
    },
    {
      line: {data: getChartDataset(moistureData, 'Moisture', '#0974c6'), options: getLineChartOptions()},
      pie: {
        value: moistureLastValue,
        type: 'dashboard',
        startColor: '#9df2b9',
        endColor: '#1941b8',
        title: 'Current Moisture',
        format: (value: number | undefined) => `${value}%`
      }
    }
  ];

  return (
    <div className='dashboard'>
      <div className='dashboard-detail'>
        {chartDisplay.map((displayRow, idx) => {
          const {line, pie} = displayRow;
          const {data, options} = line;
          const {endColor, startColor, title, value, format} = pie;
          const type = pie.type as ProgressProps['type'];

          return (
            <div className='dashboard-detail__section row' key={idx}>
              <div className='col-8 h-100'>
                <div className='line-container h-100'>
                  <Line data={data} options={options} />
                </div>
              </div>
              <div className='col h-100'>
                <div className='pie-container h-100'>
                  <div className='pie-title'>{title}</div>
                  <div className='pie-wrapper'>
                    <Progress
                      type={type}
                      percent={value}
                      strokeColor={{'0%': startColor, '100%': endColor}}
                      strokeWidth={10}
                      format={format}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardMainView;
