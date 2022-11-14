import * as types from 'src/actions';
import { action } from '../filter';

export const filterAction = {
  setCHW: (chwcode: any) =>
    action(types.FILTER.CHANGWAT, { chwpart: chwcode }),
  setAMP: (ampcode: string) =>
    action(types.FILTER.AMPUR, { amppart: ampcode }),
  setTMB: (tmbcode: string) =>
    action(types.FILTER.TAMBON, { tmbpart: tmbcode }),
  setHOS: (hcode: any) =>
    action(types.FILTER.HOSPITAL, { hospart: hcode }),
};
