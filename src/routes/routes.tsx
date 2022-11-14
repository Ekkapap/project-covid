/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { CustomRouteProps } from '.';

import BasicLayout from 'src/components/Templates/BasicLayout';
import LoginPage from 'src/pages/users/login';
import LogoutPage from 'src/pages/users/logout';
import HomePage from 'src/pages/home';
import VaccinePage from 'src/pages/vaccine';
import ScreeningPage from 'src/pages/screening';
import InfectPatientPage from 'src/pages/infectPatient';
import DeathPage from 'src/pages/death';
import TestMap from 'src/pages/test/TestMap';
import MapWrapper from 'src/pages/map';
import UsersManagePage from 'src/pages/users/manage';
import ProfilePage from 'src/pages/users/profile';
import ChangePasswordPage from 'src/pages/users/changepassword';
import ResetPasswordPage from 'src/pages/users/resetpassword';
import OtherDisease from 'src/pages/other_disease';
import ExcessMortality from 'src/pages/excess_motality';
import checkData from 'src/pages/check_data';
import Reinfected from 'src/pages/reinfected';
export const routes: CustomRouteProps[] = [
  {
    path: '/',
    exact: true,
    authority: ['admin', 'user'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/',
        authority: ['admin', 'user'],
        exact: true,
        component: HomePage,
      },
    ],
  },
  {
    path: '/reinfected',
    authority: ['admin', 'user'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/reinfected',
        authority: ['admin', 'user'],
        exact: true,
        component: Reinfected,
      },
    ],
  },
  {
    path: '/screening',
    authority: ['admin', 'user'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/screening',
        authority: ['admin', 'user'],
        exact: true,
        component: ScreeningPage,
      },
    ],
  },
  {
    path: '/infect-patient',
    authority: ['admin', 'user'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/infect-patient',
        authority: ['admin', 'user'],
        exact: true,
        component: InfectPatientPage,
      },
    ],
  },
  {
    path: '/vaccinations',
    authority: ['admin', 'user'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/vaccinations',
        authority: ['admin', 'user'],
        exact: true,
        component: VaccinePage,
      },
    ],
  },
  {
    path: '/death',
    authority: ['admin', 'user'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/death',
        authority: ['admin', 'user'],
        exact: true,
        component: DeathPage,
      },
    ],
  },
  {
    path: '/map',
    authority: ['admin', 'user'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/map',
        authority: ['admin', 'user'],
        exact: true,
        component: MapWrapper,
      },
    ],
  },
  {
    path: '/other-disease',
    authority: ['admin', 'user'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/other-disease',
        authority: ['admin', 'user'],
        exact: true,
        component: OtherDisease,
      },
    ],
  },
  {
    path: '/excess-mortality',
    authority: ['admin', 'user'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/excess-mortality',
        authority: ['admin', 'user'],
        exact: true,
        component: ExcessMortality,
      },
    ],
  },
  {
    path: '/usersmanage',
    authority: ['admin'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/usersmanage',
        authority: ['admin'],
        exact: true,
        component: UsersManagePage,
      },
    ],
  },
  {
    path: '/profile',
    authority: ['admin', 'user'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/profile',
        authority: ['admin', 'user'],
        exact: true,
        component: ProfilePage,
      },
    ],
  },
  {
    path: '/check-data',
    authority: ['admin', 'user'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/check-data',
        authority: ['admin', 'user'],
        exact: true,
        component: checkData,
      },
    ],
  },

  {
    path: '/chpass',
    authority: ['admin', 'user'],
    component: (props: any) => <BasicLayout {...props} />,
    routes: [
      {
        path: '/chpass',
        authority: ['admin', 'user'],
        exact: true,
        component: ChangePasswordPage,
      },
    ],
  },
  {
    path: '/resetpassword/:uid/:token',
    authority: ['guest'],
    component: ResetPasswordPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/logout',
    component: LogoutPage,
  },
];
