import React, {useEffect, useMemo, useState} from 'react';
import Sidebar from 'components/Sidebar';
import {Outlet, useNavigate} from 'react-router-dom';
import {PageUrl} from 'configuration/enum';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import {ISidebarItem} from 'components/interface';
import Header from 'components/Header';
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import {globalSelector} from 'app/selectors';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ThermostatIcon from '@mui/icons-material/Thermostat';

const MainLayout = () => {
  const sidebarItems: Array<ISidebarItem[]> = useMemo(
    () => [
      [
        {
          label: 'Dashboard',
          src: PageUrl.DASHBOARD,
          icon: <GridViewOutlinedIcon />
        },
        {
          label: 'Waterpump',
          src: PageUrl.WATERPUMP,
          icon: <WaterDropIcon />
        },
        {
          label: 'LED light',
          src: PageUrl.LED_LIGHT,
          icon: <LightbulbIcon />
        }
      ],
      [
        {
          label: 'Profile',
          src: PageUrl.PROFILE,
          icon: <AssignmentIndOutlinedIcon />
        },
        {
          label: 'Create account',
          src: PageUrl.CREATE_ACCOUNT,
          icon: <KeyOutlinedIcon />
        },
        {
          label: 'Log out',
          src: `/${PageUrl.LOGIN}`,
          icon: <LogoutOutlinedIcon />
        }
      ]
    ],
    []
  );
  const [activeSidebarTitle, setActiveSidebarTitle] = useState<string>('Dashboard');
  const {isShowSidebar} = useSelector(globalSelector);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(activeSidebarTitle.toLowerCase(), {replace: true});
  }, []);

  const wrapperSidebarClassname = classNames('wrapper-sidebar', {isShowSideBar: isShowSidebar});

  return (
    <div className='container-fluid p-0 m-0'>
      <div className='wrapper d-flex'>
        <div className={wrapperSidebarClassname}>
          <Sidebar
            sideBarItems={sidebarItems}
            setActiveSidebarTitle={setActiveSidebarTitle}
            activeSidebarTitle={activeSidebarTitle}
          />
        </div>
        <div className='wrapper-main'>
          <Header activeSidebarTitle={activeSidebarTitle} isShowSidebar={isShowSidebar} />

          <main className='main'>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
