import { SnackbarKey, SnackbarMessage, OptionsObject, SnackbarProps } from 'notistack';

export interface GlobalConfig {
  collapsed: boolean;
}
export interface AppConfig {
  lang: string;
}

export interface watcherEntityEvent {
  onRequest?: Function;
  onSuccess?: Function;
  onFailure?: Function;
}

export interface SnackbarNotification extends SnackbarProps {
  key?: SnackbarKey;
  message?: SnackbarMessage;
  options?: OptionsObject;
  dissmissed?: boolean;
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
}
export interface Properties {
  AREA?: number;
  PERIMETER?: number;
  PROVINCE_?: number;
  PROVINCE_I?: number;
  RCODE?: string;
  AMPHOE_?: number;
  POLBNDRY_?: number;
  POLBNDRY_I?: number;
  AMPHOE_ID?: number;
  YYMM?: number;
  TR_LEVEL?: number;
  TOT_MALE?: number;
  TOT_FEMALE?: number;
  TOT_ALL?: number;
  VOT_MALE?: number;
  VOT_FEMALE?: number;
  VOT_ALL?: number;
  SUM_MUNI?: number;
  SUM_ABT?: number;
  SUM_TAMBON?: number;
  SUM_VILL?: number;
  SUM_HOUSE?: number;
  AMPHOE_IDN?: string;
  AMP_CODE?: string;
  AMPHOE_T?: string;
  AMPHOE_E?: string;
  PROV_CODE?: string;
  PROV_NAM_T?: string;
  PROV_NAM_E?: string;
  P_CODE?: string;

  TAMBON_IDN?: string;
  TAM_CODE?: string;
  TAM_NAM_T?: string;
}

export interface GeoFeature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface GeoJSONType {
  type: string;
  features: GeoFeature[];
}

export interface SubmitStatus {
  isSubmitting?: boolean;
  isSucceed?: boolean;
  isFailure?: boolean;
}
