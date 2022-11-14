export interface User {
  user_id: string | null;
  cid: number | null;
  name: string | null;
  email: string | null;
  position: string | null;
  mobile: string | null;
  changwat: {
    changwatcode: string | null;
    changwatname: string | null;
  };
  amphur: {
    amphurcode: string | null;
    amphurname: string | null;
  };
  tambon: {
    tamboncode: string | null;
    tambonname: string | null;
  };
  department: {
    hoscode: string | null;
    hosname: string | null;
    hosfullname: string | null;
  };
  informConsent?: {
    CovidCenter?: {
      inform?: {
        register?: boolean | undefined | null;
        login?: boolean | undefined | null;
      } | undefined | null;
    } | undefined | null;
  } | undefined | null;
}

export interface UserInfo extends User {
  id: number;
  last_login: string;
  ward: number;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

export interface UserPermissions {
  nurse: boolean;
  doctor: boolean;
}

export interface UserSettings {
  loading: boolean;
  updating: boolean;
  message: string | null;
  signature: UserSignature;
}

export interface UserSignature {
  line1: string;
  line2: string;
  line3: string;
}

export interface RecentAuth {
  data: UserInfo[];
}
