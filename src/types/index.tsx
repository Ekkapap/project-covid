export interface Screening {
  date?: string;
  zone?: string;
  chw?: string;
  amp?: string;
  tmb?: string;
  hcode?: string;
  total?: number;
  total_p?: number;
  atk?: number;
  atk_p?: number;
  pcr?: number;
  pcr_p?: number;
  avg_pos_seven?: number;
}

export interface Vaccine {
  id: string;
  date: string;
  hcode: string;
  amp: string;
  bd: number;
  chw: string;
  d1: number;
  d2: number;
  tmb: string;
  total: number;
  zone: string;
}

export interface Ipd {
  id: string;
  date: string;
  zone: number;
  chw: string;
  amp: string;
  tmb: string;
  hcode: string;
  admit: number;
  admit_wk: number;
  dch: number;
  vent: number;
  vent_wk: number;
}

//ปรับแก้ไข ตอนดึง json มาเก็บจาก loopback HOSPITAL
export interface Hospital {
  id: string;
  hos_ampid: string;
  hos_bed: string;
  hos_bed_real: string;
  hos_fullname: string;
  hos_id: string;
  hos_name: string;
  hos_proid: string;
  hos_tumid: string;
  hos_type_id: string;
  hos_type_name: string;
  lastlogdatetime: string;
  lastupdate: string;
  lat: string;
  long: string;
  note: string;
  ph_area: string;
  ph_id9: string;
  provider: string;
  province_name: string;
  total: number;
  transfermode: string;
  transferpercent: number;
  transfers: number;
  version: string;
  zonecode: string;
  autoSettingDate: string;
}

export interface Death {
  id: string;
  date: string;
  zone: number;
  chw: string;
  amp: string;
  tmb: string;
  hcode: string;
  count: number;
  disease: string;
}

export interface OtherDisease {
  id: string;
  date: string;
  zone: number;
  chw: string;
  amp: string;
  tmb: string;
  hcode: string;
  cdeath: number;
  cdeath_wk: number;
  death28: number;
  death28_wk: number;
}

export interface VaccineInfo {
  vaccine_plan_no: string;
  vaccine_manufacturer: string;
  immunization_datetime: string;
}

// export interface ReinfectedRequest {
//   isFetching: boolean;
//   //updated_at: Date | undefined;
//   data: ReinfectedData[];
// }

export interface ReinfectedData {
  id: string;
  date: string;
  vstdate: string;
  cid: string;
  zone: number;
  chw: string;
  amp: string;
  tmb: string;
  hcode: string;
  vaccines_info: VaccineInfo[];
  reinfected: number;
}

export interface ScreeningRequest {
  isFetching: boolean;
  //updated_at: Date | undefined;
  data: Screening[];
}

export interface VaccineRequest {
  isFetching: boolean;
  //updated_at: Date | undefined;
  data: Vaccine[];
}

export interface IpdRequest {
  isFetching: boolean;
  //updated_at: Date | undefined;
  data: Ipd[];
}

export interface HospitalRequest {
  isFetching: boolean;
  //updated_at: Date | undefined;
  data: Hospital[];
}

export interface DeathRequest {
  isFetching: boolean;
  //updated_at: Date | undefined;
  data: Death[];
}

export interface OtherDiseaseRequest {
  isFetching: boolean;
  //updated_at: Date | undefined;
  data: OtherDisease[];
}
export interface ReinfectedRequest {
  isFetching: boolean;
  //updated_at: Date | undefined;
  data: ReinfectedData[];
}
