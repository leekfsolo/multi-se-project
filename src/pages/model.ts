import {ReactElement} from 'react';

export interface IChangePassword {
  password: string;
  repassword: string;
}

export interface IProfile {
  fullname: string;
  phone: string;
  accountRole: string;
  username: string;
  password: string;
}

export interface IDeviceData {
  id: string;
  value: string;
  feed_id: number;
  feed_key: string;
  created_at: string;
  created_epoch: number;
  expiration: string;
}

export interface IDataDisplay extends ActionColumn {
  id: string;
  region: string;
  createdDate?: string;
  nosample: number;
  type?: string;
}

export interface IData extends Omit<IDataDisplay, 'id'> {
  filename?: string;
  training_file?: any;
}

export interface ITaskUpload {
  filename: string;
  region: string;
  taskType: string;
  modelType: string;
  ckpt: string;
  epoch: number | string;
}

export interface ITaskData extends ITaskDisplay {
  diff_loss?: string;
  dur_loss?: string;
  prior_loss?: string;
}

export interface ITaskDisplay extends ActionColumn {
  filename?: string;
  accuracy?: string;
  task_id: string;
  task_type: string;
  user_id: number;
  state: number;
  model_name: string;
}

export interface dataGetAllParams {
  type?: string;
  region?: string;
}

export interface ActionColumn {
  action?: ReactElement;
}
