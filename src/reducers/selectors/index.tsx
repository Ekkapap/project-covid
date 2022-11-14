/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs';
import { createSelector } from 'reselect';
import { RootState } from '../index';

export const getToken = (state: RootState) => state.auth.authToken;
export const getUser = (state: RootState) => state.user;