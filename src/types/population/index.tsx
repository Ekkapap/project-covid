export interface TambolPop {
  addressid: string;
  amphur_id: string;
  name: string;
  pop: number;
}

export interface AmphurPop {
  province_id: string;
  amphur_id: string;
  id: string;
  amphur_name: string;
  pop: number;
  tambol: TambolPop[];
}

export interface ChangwatPop {
  changwatcode: string;
  changwatname: string;
  pop: number;
  amphur: AmphurPop[];
}

export interface PopulationRequest {
  isFetching: boolean;
  data: ChangwatPop[];
}
