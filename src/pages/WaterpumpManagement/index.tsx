import {DataPair, TableHeadCell} from 'pages/interface';
import {Box, Paper} from '@mui/material';
import React, {useState, useEffect, useCallback, Suspense, lazy} from 'react';
import CTableToolbar from 'components/CTableToolbar';
import CPagination from 'components/CPagination';
import CTable from 'components/CTable';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {waterpumpSelector} from 'app/selectors';
import {handleLoading} from 'app/globalSlice';
import customToast, {ToastType} from 'components/CustomToast/customToast';
import IconButton from '@mui/material/IconButton';
import {IHandleActionParams} from 'components/interface';
import {CModalProps} from 'components/CModal/CModal';
import {ActionType} from 'configuration/enum';
import DeleteIcon from '@mui/icons-material/Delete';
import ActionBar, {actionBarControlButtonsProps} from 'components/ActionBar/ActionBar';
import {formatQuantity} from 'utils/helpers/formatQuantity';
import {getWaterpumpData, postPumpData} from './waterpumpSlice';
import PageOverview from 'components/PageOverview';
import {Waterpump} from 'assets';
import WavesIcon from '@mui/icons-material/Waves';
const CModal = lazy(() => import('components/CModal/CModal'));

const WaterpumpManagement = () => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const {waterpumpData} = useAppSelector(waterpumpSelector);
  const [modelContent, setModelContent] = useState<CModalProps>();

  const headCells: TableHeadCell[] = [
    {
      id: 'order',
      padding: 'normal',
      label: 'Order',
      align: 'left'
    },
    {
      id: 'status',
      padding: 'normal',
      label: 'Status',
      align: 'left'
    },
    {
      id: 'created_at',
      padding: 'normal',
      label: 'Created At',
      align: 'left'
    },
    {
      id: 'created_epoch',
      padding: 'normal',
      label: 'Created Epoch',
      align: 'left'
    },
    {id: 'Action', label: 'Action', align: 'center', padding: 'none'}
  ];

  const handleSwitchChecked = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {checked} = event.target;
    const data = {value: checked ? 1 : 0};

    await dispatch(postPumpData(data));
    handleUpdate();
  };

  const handleAction = async ({type, payload}: IHandleActionParams) => {
    const modalPopupState: CModalProps = {
      closeText: 'Close',
      content: '',
      title: 'Confirm'
    };

    let contentText = '';

    switch (type) {
      case ActionType.DELETE:
        Object.assign(modalPopupState, {
          handleConfirm: async () => {
            dispatch(handleLoading(true));
            customToast(ToastType.SUCCESS, 'Delete Successfully');
            dispatch(handleLoading(false));
            handleUpdate();
          },
          confirmText: 'Delete',
          maxWidth: 'xs'
        });
        contentText = 'Are you sure you want to delete these items?';
        break;
      default:
        break;
    }

    modalPopupState.content = (
      <div className='d-flex justify-content-center align-items-center gap-2 modal-delete'>{contentText}</div>
    );

    setModelContent(modalPopupState);
  };

  const displayData = waterpumpData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
    return {
      ...data,
      action: [
        {
          icon: (
            <IconButton disableFocusRipple sx={{padding: '4px'}}>
              <DeleteIcon />
            </IconButton>
          ),
          actionType: ActionType.DELETE,
          title: 'Delete data',
          handle: handleAction
        }
      ]
    };
  });

  const handleDelete = async (selectedIds: string[]) => {
    await handleAction({type: ActionType.DELETE, payload: selectedIds});
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = displayData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const actionBarControlButtons: actionBarControlButtonsProps[] = [
    {
      label: `Delete All (${formatQuantity(selected.length)})`,
      variant: 'text',
      color: 'error',
      onClick: () => handleDelete(selected)
    }
  ];

  const handleUpdate = useCallback(async () => {
    dispatch(handleLoading(true));
    try {
      await dispatch(getWaterpumpData()).unwrap();
      dispatch(handleLoading(false));
      setSelected([]);
    } catch (err) {
      console.error(err);
      dispatch(handleLoading(false));
    }
  }, []);

  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  const deviceInfo: DataPair[] = [
    {key: 'Voltage', value: '3V - 6V'},
    {key: 'Flow speed', value: '120L/h'},
    {key: 'Connection type', value: 'USB port'},
    {key: 'Pump dimensions', value: '0.9" x 1.3"'}
  ];

  return (
    <main className='waterpump-management'>
      <Suspense>{modelContent && <CModal {...modelContent} />}</Suspense>
      <PageOverview
        handleSwitch={handleSwitchChecked}
        isChecked={waterpumpData[0]?.value === '1'}
        dataTitle='water flow'
        dataValue={75}
        image={Waterpump}
        deviceInfo={deviceInfo}
        dataIcon={<WavesIcon />}
      />
      <Box sx={{width: '100%'}}>
        <Paper sx={{width: '100%', mb: 2}}>
          <CTableToolbar tableTitle='Waterpump Management' />
          <CTable
            data={displayData}
            headCells={headCells}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={selected}
            handleClick={handleClick}
            handleSelectAllClick={handleSelectAllClick}
            isSelected={isSelected}
          />
          <CPagination
            maxLength={waterpumpData.length}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Paper>
        {selected.length > 0 && (
          <ActionBar
            handleSelectAllClick={handleSelectAllClick}
            selectedRows={selected.length}
            rowCount={displayData.length}
            actionBarControlButtons={actionBarControlButtons}
          />
        )}
      </Box>
    </main>
  );
};

export default WaterpumpManagement;
