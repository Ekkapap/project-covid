export interface AuthState {
  authPending: boolean;
  loggedInSuccess: boolean; // succesful load user setting
  loginError: boolean;
  errorMessage: string | null;
  authority: string[];
  authToken: string | null;
  refreshToken: string | null;
  tokenExpire: string | null;
  switchUser: boolean;
  permissions: {
    Role:Record<string,never>;
  }
}

