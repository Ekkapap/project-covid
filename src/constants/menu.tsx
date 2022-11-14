/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { AuthState as type } from 'src/types/auth';
const topMenu = [
  { label: <Link to='/register'>ลงทะเบียน</Link>, key: 'covidtoday' },
  { label: <Link to='/login'>เข้าสู่ระบบ</Link>, key: 'screening' },
];

const sideMenu = (lang: string, auth: type) => {
  const adminMenu = [
    {
      label: (
        <Link to='/usersmanage'>
          <Trans>menu.usersmanage</Trans>
        </Link>
      ),
      key: '/usersmanage',
    },
    {
      label: (
        <Link to='/check-data'>
          <Trans>menu.check_data</Trans>
        </Link>
      ),
      key: '/check-data',
    },
  ];
  const whenLogin = [
    {
      label: (
        <Link to='/logout'>
          <Trans>menu.logout</Trans>
        </Link>
      ),
      key: '/logout',
    },
  ];
  const whenLogout = [
    {
      label: (
        <Link to='/login'>
          <Trans>menu.login</Trans>
        </Link>
      ),
      type: 'disabled',
      key: '/login',
    },
  ];
  const sideMenu = [
    {
      label: (
        <Link to='/'>
          <Trans>menu.covid_today</Trans>
        </Link>
      ),
      key: '/',
    },
    {
      label: (
        <Link to='/screening'>
          <Trans>menu.covid_screening</Trans>
        </Link>
      ),
      key: '/screening',
    },
    {
      label: (
        <Link to='/map'>
          <Trans>menu.covid_map</Trans>
        </Link>
      ),
      key: '/map',
    },
    {
      label: (
        <Link to='/infect-patient'>
          <Trans>menu.covid_infected</Trans>
        </Link>
      ),
      key: '/infect-patient',
    },
    {
      label: (
        <Link to='/reinfected'>
          <Trans>menu.reinfected</Trans>
        </Link>
      ),
      key: '/reinfected',
    },
    {
      label: (
        <Link to='/vaccinations'>
          <Trans>menu.covid_vaccine</Trans>
        </Link>
      ),
      key: '/vaccinations',
    },
    {
      label: (
        <Link to='/death'>
          <Trans>menu.covid_death</Trans>
        </Link>
      ),
      key: '/death',
    },
    { label: '', key: 'devider1', type: 'divider' },
    {
      label: (
        <Link to='/excess-mortality'>
          <Trans>menu.excess_mortality</Trans>
        </Link>
      ),
      key: '/excess-mortality',
    },
    {
      label: (
        <Link to='/other-disease'>
          <Trans>menu.other_disease</Trans>
        </Link>
      ),
      key: '/other-disease',
    },
    { label: '', key: 'devider2', type: 'divider' },
    // { label: <Trans>menu.documents</Trans>, key: '/covidDoc' },
    // { label: <Trans>menu.downloads</Trans>, key: '/download' },
    // { label: <Trans>menu.news</Trans>, key: '/covidNews' },
    // { label: <Trans>menu.developer</Trans>, key: '/developerInfo' },
    // { label: <Trans>menu.r8way</Trans>, key: '/r8wayInfo' },
    // { label: '', key: 'devider2', type: 'divider' }
  ];
  let finalSideMenu = [];
  if (auth.loggedInSuccess) {
    if (auth.authority[0] == 'admin' || auth.permissions.Role?.name == 'AdminR8') {
      finalSideMenu = [...sideMenu, ...adminMenu, ...whenLogin];
    } else {
      finalSideMenu = [...sideMenu, ...whenLogin];
    }
  } else {
    finalSideMenu = [...sideMenu, ...whenLogout];
  }
  // return [...sideMenu, ...adminMenu, ...whenLogin];
  return finalSideMenu;
};

export { topMenu, sideMenu };
