/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from 'reselect';
import { RootState } from '../index';
import _ from 'lodash';
import { vaccineJson } from 'src/constants/vaccine';
import moment from 'moment';
import dayjs from 'dayjs';
import { central, chwpart_krung_thep, north, north_east, south } from 'src/constants/thaiaddress';
import { getFilterData } from './home';

//export const getToken = (state: RootState) => state.global.config.collapsed;
// const dummyState = (state: any) => state;

const vaccineData = (state: RootState) => state.vaccine.data;

export const getVaccineData = (state: RootState) =>
  createSelector(vaccineData, (items) => {
    const data = getFilterData(items)(state);

    const dose1: any = _(data)
      .groupBy('date')
      .map((row, id) => {
        const vaccineSum = _.filter(data, (x) => x.date < id);
        return {
          date: dayjs(id).format('YYYY-MM-DD'),
          type: 'dose1',
          value: _.sumBy(row, 'd1'),
          // total: _.sumBy(vaccineSum, 'dose1'),
          percent: Math.ceil((vaccineSum.reduce((acc: any, amount: any) => acc + amount.d1, 0) * 100) / 650000),
        };
      })
      .value();

    const dose2: any = _(data)
      .groupBy('date')
      .map((row, id) => {
        const vaccineSum = _.filter(data, (x) => x.date < id);
        return {
          date: dayjs(id).format('YYYY-MM-DD'),
          type: 'dose2',
          value: _.sumBy(row, 'd2'),
          // total: _.sumBy(vaccineSum, 'dose2'),
          percent: Math.ceil((vaccineSum.reduce((acc: any, amount: any) => acc + amount.d2, 0) * 100) / 650000),
        };
      })
      .value();
    const booster: any = _(data)
      .groupBy('date')
      .map((row, id) => {
        const vaccineSum = _.filter(data, (x) => x.date < id);
        return {
          date: dayjs(id).format('YYYY-MM-DD'),
          type: 'booster',
          value: _.sumBy(row, 'bd'),
          // total: _.sumBy(vaccineSum, 'bd'),
          percent: Math.ceil((vaccineSum.reduce((acc: any, amount: any) => acc + amount.bd, 0) * 100) / 650000),
        };
      })
      .value();

    return [...dose1, ...dose2, ...booster];
  });

export const getVaccineReport = (state: RootState) =>
  createSelector(vaccineData, getFilterData, (item) => {
    const filterData = getFilterData(item)(state);

    const getData7: any = _.filter(filterData, function (item) {
      return dayjs(item.date) >= dayjs().subtract(7, 'day') && dayjs(item.date) <= dayjs();
    });

    const arr: any = {
      seven_day: {
        dose1: _.sumBy(getData7, 'd1'),
        dose2: _.sumBy(getData7, 'd2'),
        booster: _.sumBy(getData7, 'bd'),
      },
      total_vaccine: {
        dose1: _.sumBy(filterData, 'd1'),
        dose2: _.sumBy(filterData, 'd2'),
        booster: _.sumBy(filterData, 'bd'),
      },
    };

    return arr;
  });

export const getNewData = (state: RootState) =>
  createSelector(vaccineData, (items) => {
    const filterData = getFilterData(items)(state);
    const grouped = _(filterData)
      .orderBy('date')
      .groupBy('date')
      .map((platform, date) => ({
        date: dayjs(date).format('YYYY-MM-DD'),
        d1: _.sumBy(platform, 'd1'),
        d2: _.sumBy(platform, 'd2'),
        bd: _.sumBy(platform, 'bd'),
        total: _.sumBy(platform, 'total'),
      }))
      .value();

    const transform = grouped.map((item: any) => {
      const vaccineWeekly = (date: any, dose: string) =>
        Math.ceil(
          _.filter(grouped, (x) => x.date < item.date && x.date >= date).reduce(
            dose == 'd1'
              ? (acc: any, amount: any) => acc + amount.d1
              : dose == 'd2'
              ? (acc: any, amount: any) => acc + amount.d2
              : dose == 'bd'
              ? (acc: any, amount: any) => acc + amount.bd
              : dose == 'total'
              ? (acc: any, amount: any) => acc + amount.total
              : (acc: any, amount: any) => 0,
            0,
          ) / 7,
        );

      const vaccineSum = (dose: string) =>
        Math.ceil(
          (_.filter(grouped, (x) => x.date < item.date).reduce(
            dose == 'd1'
              ? (acc: any, amount: any) => acc + amount.d1
              : dose == 'd2'
              ? (acc: any, amount: any) => acc + amount.d2
              : dose == 'bd'
              ? (acc: any, amount: any) => acc + amount.bd
              : (acc: any, amount: any) => 0,
            0,
          ) *
            100) /
            650000, //จำนวนประชากรทั้งหมด อายุ12ขึ้นไป
        );
      const day7 = dayjs(item.date).subtract(7, 'day').format();
      const day = dayjs(item.date).format('YYYY-MM-DD');

      return {
        date: day,
        dose1: item.d1,
        dose2: item.d2,
        booster: item.bd,
        total: item.total,
        weekly_dose1: vaccineWeekly(day7, 'd1'),
        weekly_dose2: vaccineWeekly(day7, 'd2'),
        weekly_booster: vaccineWeekly(day7, 'bd'),
        weekly_total: vaccineWeekly(day7, 'total'),
        percent_dose1: vaccineSum('d1'),
        percent_dose2: vaccineSum('d2'),
        percent_booster: vaccineSum('bd'),
      };
    });

    return transform;
  });
