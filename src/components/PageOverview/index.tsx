import CButton from 'components/CButton';
import CInput from 'components/CInput';
import React, {ReactElement, ChangeEvent} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {FormControlLabel, LinearProgress} from '@mui/material';
import {DataPair} from 'pages/interface';
import CSwitch from 'components/CSwitch/CSwitch';

interface Props {
  image: string;
  dataTitle: string;
  dataValue: number;
  dataIcon: ReactElement;
  deviceInfo: DataPair[];
  isChecked: boolean;
  handleSwitch: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const PageOverview = (props: Props) => {
  const {dataTitle, dataValue, deviceInfo, image, dataIcon, handleSwitch, isChecked = false} = props;

  return (
    <div className='overview-info'>
      <div className='overview-info__detail'>
        <div className='overview-general'>
          <div className='overview-general__avatar'>
            <p className='card-title'>Basic Info</p>
            <img src={image} alt='' />
          </div>

          <div className='overview-general__content'>
            {deviceInfo.map((data, idx) => (
              <div className='content-data' key={idx}>
                <p className='mb-1'>{data.key}</p>
                <span>{data.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='overview-progress'>
          <div className='d-flex justify-content-between mb-4'>
            <p className='card-title'>{dataTitle}</p>
            <span>{dataValue}/100</span>
          </div>

          <div className='overview-progress__bar'>
            <div className='bar-icon'>
              <div className='bar-icon__wrapper'>{dataIcon}</div>
            </div>
            <LinearProgress variant='determinate' value={dataValue} />
          </div>
        </div>
      </div>
      <div className='overview-info__filter'>
        <form action='#' method='POST' noValidate>
          <CInput size='small' />
          <CInput size='small' />
          <CInput size='small' />
        </form>

        <div className='d-flex justify-content-between mt-3'>
          <FormControlLabel control={<CSwitch checked={isChecked} onChange={handleSwitch} />} label='Off/On' />
          <div className='d-flex gap-2'>
            <CButton variant='text' className='d-flex align-items-center gap-1'>
              <SearchIcon /> Search
            </CButton>
            <CButton variant='contained' className='d-flex align-items-center gap-1'>
              <RestartAltIcon /> Reset
            </CButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageOverview;
