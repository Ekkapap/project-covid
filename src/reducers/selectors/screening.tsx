/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from 'reselect';
import { RootState } from '../index';
import _ from 'lodash';
import { screeningData } from 'src/constants/screening';
import dayjs from 'dayjs';
import * as isLeapYear from 'dayjs/plugin/isLeapYear'; // import plugin
import 'dayjs/locale/zh-cn'; // import locale
import { format } from 'path';
import isBetween from 'dayjs/plugin/isBetween';
import { getFilterData } from './home';

import { central, chwpart_krung_thep, north, north_east, south } from 'src/constants/thaiaddress';
import { Screening } from 'src/types';

dayjs.extend(isBetween);

const dummyState = (state: any) => state;
const screeningState = (state: any) => state.screening;

export const getDataReport = () => {
  const data = screeningData;

  const data7Day: any = _.filter(data, function (x) {
    return (
      x.date <= dayjs('2022-05-31').format('YYYY-MM-DD') &&
      x.date > dayjs('2022-05-31').add(-7, 'day').format('YYYY-MM-DD')
    );
  });

  const screening_sevenday = data7Day
    .map((x: any) => x.screening_all)
    .reduce((acc: any, amount: any) => acc + amount, 0);

  const screening_pos_weekly = data7Day
    .map((x: any) => x.atk_positive + x.rt_pcr_positive)
    .reduce((acc: any, amount: any) => acc + amount, 0);

  const screening_all = data.map((x: any) => x.screening_all).reduce((acc: any, amount: any) => acc + amount, 0);
  const screening_rt_pcr = data.map((x: any) => x.rt_pcr).reduce((acc: any, amount: any) => acc + amount, 0);
  const screening_pos_all = data
    .map((x: any) => x.atk_positive + x.rt_pcr_positive)
    .reduce((acc: any, amount: any) => acc + amount, 0);

  const arr = {
    screening_sevenday,
    screening_all,
    screening_rt_pcr,
    screening_pos_weekly,
    screening_pos_all,
  };

  // console.log(arr);

  return arr;
};

export const getReportChart = createSelector(dummyState, (items) => {
  let data = items;

  const filterdata: any = (d: string) =>
    _.filter(data, (x) => x.date < d && dayjs(x.date) >= dayjs(d).subtract(7, 'day'))
      // .map((co: any) => co.rt_pcr_positive + co.atk_positive)
      .reduce((acc: any, amount: any) => acc + (amount.rt_pcr_positive + amount.atk_positive), 0);

  data = data
    .filter((x: any) => x.date > '2022-03-01')
    .map((item: any, key: any) => {
      const filter = filterdata(item.date);
      const avg7 = Math.ceil(filter / 7);
      const screening7 = Math.ceil(
        _.filter(data, (x) => x.date < item.date && dayjs(x.date) >= dayjs(item.date).subtract(7, 'day')).reduce(
          (acc: any, amount: any) => acc + amount.screening_all,
          0,
        ) / 7,
      );

      return {
        ...item,
        screening_all_seven: screening7,
        pos_all: item.atk_positive + item.rt_pcr_positive,
        avg_pos_seven: avg7,
        rate_pos_seven: Math.ceil((filter * 100000) / 700000),
        percent_pos_seven: avg7 ? Math.ceil(((item.atk_positive + item.rt_pcr_positive - avg7) * 100) / avg7) : 0,
      };
    });

  return data;
});

///////////////////////////

export const getDataReportDashboard = (state: RootState) =>
  createSelector(screeningState, (items) => {
    const data = items?.data || [];

    const data7Day: any = _.filter(data, function (x) {
      return (
        dayjs(x.date).format('YYYY-MM-DD') <= dayjs().format('YYYY-MM-DD') &&
        dayjs(x.date).format('YYYY-MM-DD') > dayjs().add(-7, 'day').format('YYYY-MM-DD')
      );
    });

    const screening_sevenday = data7Day.map((x: any) => x.total).reduce((acc: any, amount: any) => acc + amount, 0);

    const screening_pos_weekly = data7Day.map((x: any) => x.total_p).reduce((acc: any, amount: any) => acc + amount, 0);

    const screening_all = data.map((x: any) => x.total).reduce((acc: any, amount: any) => acc + amount, 0);
    const screening_rt_pcr = data.map((x: any) => x.pcr).reduce((acc: any, amount: any) => acc + amount, 0);
    const screening_pos_all = data.map((x: any) => x.total_p).reduce((acc: any, amount: any) => acc + amount, 0);

    const arr = {
      screening_sevenday,
      screening_all,
      screening_rt_pcr,
      screening_pos_weekly,
      screening_pos_all,
    };

    // console.log(arr);

    return arr;
  });

export const getScreeningReportChart = (state: RootState) =>
  createSelector(screeningState, (items) => {
    const data = items?.data || [];
    //data = data.filter((x: any) => x.date > dayjs().subtract(30, 'day').format('YYYY-MM-DD'));

    const filterdata: any = (end: string, start: string) =>
      Math.ceil(
        _.filter(data, (x: any) => x.date < end && x.date >= start).reduce(
          (acc: any, amount: any) => acc + amount.total,
          0,
        ) / 7,
      );

    const groupData = _(data)
      .groupBy('date')
      .map((item: any, key: any) => {
        return {
          date: key,
          total: _.sumBy(item, 'total'),
          total_wk: filterdata(key, dayjs(key).subtract(7, 'day').format('YYYY-MM-DD')),
        };
      })
      .value();

    return _.orderBy(groupData, 'date', 'asc');
  });

export const getReportTypes = (state: RootState) =>
  createSelector(screeningState, (items) => {
    const data = items?.data || [];
    const rt_pcr: any = _(data)
      .groupBy('date')
      .map((row, id) => ({
        date: id,
        type: 'RT-PCR',
        value: _.sumBy(row, 'pcr'),
      }))
      .value();

    const atk: any = _(data)
      .groupBy('date')
      .map((row, id) => ({
        date: id,
        type: 'ATK',
        value: _.sumBy(row, 'atk'),
      }))
      .value();
    return [..._.orderBy(atk, 'date'), ..._.orderBy(rt_pcr, 'date')];
  });

export const getScreeningPositiveChart = (state: RootState) =>
  createSelector(screeningState, (items) => {
    const data = items?.data || [];
    //data = data.filter((x: any) => x.date > dayjs().subtract(30, 'day').format('YYYY-MM-DD'));

    const filterdata: any = (end: string, start: string) =>
      Math.ceil(
        _.filter(data, (x: any) => x.date < end && x.date >= start).reduce(
          (acc: any, amount: any) => acc + amount.total_p,
          0,
        ) / 7,
      );

    const groupData = _(data)
      .groupBy('date')
      .map((item: any, key: any) => {
        return {
          date: key,
          total_p: _.sumBy(item, 'total_p'),
          avg_p_wk: filterdata(key, dayjs(key).subtract(7, 'day').format('YYYY-MM-DD')),
        };
      })
      .value();

    return _.orderBy(groupData, 'date', 'asc');
  });

export const getScreeningPositiveWk = (state: RootState) =>
  createSelector(screeningState, (items) => {
    let data = items?.data || [];
    data = data.filter((x: any) => x.date > dayjs().subtract(30, 'day').format('YYYY-MM-DD'));

    const filterdata: any = (end: string, start: string) =>
      Math.ceil(
        _.filter(data, (x: any) => x.date < end && x.date >= start).reduce(
          (acc: any, amount: any) => acc + amount.total_p,
          0,
        ),
      );

    const groupData = _(data)
      .groupBy('date')
      .map((item: any, key: any) => {
        const filter = filterdata(key, dayjs(key).subtract(7, 'day').format('YYYY-MM-DD'));
        const avg7 = Math.ceil(filter / 7);

        return {
          date: key,
          p_wk: Math.ceil((filter * 100000) / 700000),
          percent_p_wk: avg7 ? Math.ceil(((_.sumBy(item, 'total_p') - avg7) * 100) / avg7) : 0,
        };
      })
      .value();

    return _.orderBy(groupData, 'date', 'asc');
  });

export const getDataArea = (state: any, filter?: string) =>
  createSelector(screeningState, (items) => {
    let data_all = items?.data || [];

    let data_seven = _.filter(data_all, function (x) {
      return x.date >= dayjs().subtract(7, 'day').format('YYYY-MM-DD');
    });

    switch (filter) {
      case 'krung_thep_maha_nakhon':
        data_all = _.filter(data_all, (x: any) => chwpart_krung_thep.has(Number(x.chw)));
        data_seven = _.filter(data_seven, (x: any) => chwpart_krung_thep.has(Number(x.chw)));
        break;
      case 'central':
        data_all = _.filter(data_all, (x: any) => central.has(Number(x.chw)));
        data_seven = _.filter(data_seven, (x: any) => central.has(Number(x.chw)));
        break;
      case 'north':
        data_all = _.filter(data_all, (x: any) => north.has(Number(x.chw)));
        data_seven = _.filter(data_seven, (x: any) => north.has(Number(x.chw)));
        break;
      case 'north_east':
        data_all = _.filter(data_all, (x: any) => north_east.has(Number(x.chw)));
        data_seven = _.filter(data_seven, (x: any) => north_east.has(Number(x.chw)));
        break;
      case 'south':
        data_all = _.filter(data_all, (x: any) => south.has(Number(x.chw)));
        data_seven = _.filter(data_seven, (x: any) => south.has(Number(x.chw)));
        break;

      default:
        break;
    }

    data_seven = _(data_seven)
      .groupBy('chw')
      .map(function (items, bdate) {
        return {
          chwpart: bdate,
          positive_seven: _.sumBy(items, 'total_p'),
          rate_positive_seven: Math.ceil((_.sumBy(items, 'total_p') * 100000) / 700000),
        };
      })
      .value();

    data_all = _(data_all)
      .groupBy('chw')
      .map(function (items, bdate) {
        return {
          chwpart: bdate,
          positive: _.sumBy(items, 'total_p'),
          rate_positive: Math.ceil((_.sumBy(items, 'total_p') * 100000) / 700000),
        };
      })
      .value();

    const arr = {
      seven_day: data_seven,
      all: data_all,
    };

    return arr;
  });

//groupData = groupData.filter((x: any) => x.date > dayjs().subtract(30, 'day').format('YYYY-MM-DD'));

// groupData = groupData.map((item: any, key: any) => {
//   const filter = filterdata(item.date, dayjs(item.date).subtract(7, 'day').format('YYYY-MM-DD'));
//   const avg7 = Math.ceil(filter / 7);
//   const screening7 = Math.ceil(
//     _.filter(data, (x) => x.date < item.date && dayjs(x.date) >= dayjs(item.date).subtract(7, 'day')).reduce(
//       (acc: any, amount: any) => acc + amount.total,
//       0,
//     ) / 7,
//   );
//   return {
//     ...item,
//     screening_all: item.total,
//     screening_all_seven: screening7,
//     pos_all: item.total_p,
//     avg_pos_seven: avg7,
//     rate_pos_seven: Math.ceil((filter * 100000) / 700000),
//     percent_pos_seven: avg7 ? Math.ceil(((item.total_p - avg7) * 100) / avg7) : 0,
//   };
// });
