import { createSelector } from 'reselect';
import { RootState } from '../index';
import _ from 'lodash';
import dayjs from 'dayjs';
// import { Screening } from 'src/types';

export const getHospcodeFilter = (state: RootState) => state.filter.hospart;
export const getChwpartFilter = (state: RootState) => state.filter.chwpart;
export const getAmppartFilter = (state: RootState) => state.filter.amppart;
export const getTmbpartFilter = (state: RootState) => state.filter.tmbpart;
export const dataScreening = (state: RootState) => state.screening.data;
export const dataDeath = (state: RootState) => state.death.covid.data;
export const dataIpd = (state: RootState) => state.ipd.data;

export const getFilterData = (items: any) =>
  createSelector(
    getHospcodeFilter,
    getChwpartFilter,
    getAmppartFilter,
    getTmbpartFilter,
    (hospcodeFilter, chwpartFilter, amppartFilter, tmbpartFilter) => {
      let getData: any = items;

      if (hospcodeFilter !== 'ทุกหน่วยงาน') {
        getData = getData.filter((item: any) => item.hcode === hospcodeFilter);
      }
      if (chwpartFilter !== 'ทุกจังหวัด') {
        getData = getData.filter((item: any) => item.chw === chwpartFilter);
      }
      if (amppartFilter !== 'ทุกอำเภอ') {
        getData = getData.filter((item: any) => item.amp === amppartFilter);
      }
      if (tmbpartFilter !== 'ทุกตำบล') {
        getData = getData.filter((item: any) => item.tmb === tmbpartFilter);
      }

      return getData;
    },
  );

export const getApPositive = (state: RootState) =>
  createSelector(dataScreening, (screening) => {
    const getData = getFilterData(screening);
    const data = getData(state);

    const f_day = (t_date: any) =>
      _.filter(data, (x: any) => dayjs(x.date).format('YYYY-MM-DD') === t_date).reduce(
        (acc: any, amount: any) => acc + amount.total_p,
        0,
      );
    const f_avg7 = (t_date: any) =>
      _.filter(data, (x: any) => x.date < dayjs().format('YYYY-MM-DD') && x.date >= t_date).reduce(
        (acc: any, amount: any) => acc + amount.total_p,
        0,
      ) / 7;

    const f_percent = () => {
      const c = f_day(dayjs().format('YYYY-MM-DD')) - f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD'));
      return (c / f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD'))) * 100;
    };

    const array = {
      // หาข้อมูลเฉลี่ย 7 วัน
      avg7: f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD')),
      // หาข้อมูลเฉลี่ย วันปัจจุบัน
      toDay: f_day(dayjs().format('YYYY-MM-DD')),
      calculate: f_day(dayjs().format('YYYY-MM-DD')) - f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD')),
      percent: f_percent(),
      //Group Date เอาไปกราฟ
      chartData: _(data)
        .groupBy('date')
        .map((item: any, key: any) => {
          return {
            date: dayjs(key).format('YYYY-MM-DD'),
            total_p: _.sumBy(item, 'total_p'),
          };
        })
        .value(),
    };
    return array;
  });

export const getApScreening = (state: RootState) =>
  createSelector(dataScreening, (screening) => {
    const getData = getFilterData(screening);
    const data = getData(state);

    const f_day = (t_date: any) =>
      _.filter(data, (x: any) => dayjs(x.date).format('YYYY-MM-DD') === t_date).reduce(
        (acc: any, amount: any) => acc + amount.total,
        0,
      );

    const f_avg7 = (t_date: any) =>
      _.filter(data, (x: any) => x.date < dayjs().format('YYYY-MM-DD') && x.date >= t_date).reduce(
        (acc: any, amount: any) => acc + amount.total,
        0,
      ) / 7;

    const f_percent = () => {
      const c = f_day(dayjs().format('YYYY-MM-DD')) - f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD'));
      return (c / f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD'))) * 100;
    };

    const array = {
      // หาข้อมูลเฉลี่ย 7 วัน
      avg7: f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD')),
      // หาข้อมูลเฉลี่ย วันปัจจุบัน
      toDay: f_day(dayjs().format('YYYY-MM-DD')),
      //Group Date เอาไปกราฟ
      calculate: f_day(dayjs().format('YYYY-MM-DD')) - f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD')),
      percent: f_percent(),
      chartData: _(data)
        .groupBy('date')
        .map((item: any, key: any) => {
          return {
            date: dayjs(key).format('YYYY-MM-DD'),
            total: _.sumBy(item, 'total'),
          };
        })
        .value(),
    };

    return array;
  });

export const getDeath28 = (state: RootState) =>
  createSelector(dataDeath, (death) => {
    const getData = getFilterData(death);
    const data = getData(state);

    const f_day = (t_date: any) =>
      _.filter(data, (x: any) => dayjs(x.date).format('YYYY-MM-DD') === t_date).reduce(
        (acc: any, amount: any) => acc + amount.death28,
        0,
      );

    const f_avg7 = (t_date: any) =>
      _.filter(data, (x: any) => x.date < dayjs().format('YYYY-MM-DD') && x.date >= t_date).reduce(
        (acc: any, amount: any) => acc + amount.death28,
        0,
      ) / 7;

    const f_percent = () => {
      const c = f_day(dayjs().format('YYYY-MM-DD')) - f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD'));
      return (c / f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD'))) * 100;
    };

    const array = {
      // หาข้อมูลเฉลี่ย 7 วัน
      avg7: f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD')),
      // หาข้อมูลเฉลี่ย วันปัจจุบัน
      toDay: f_day(dayjs().format('YYYY-MM-DD')),
      //Group Date เอาไปกราฟ
      calculate: f_day(dayjs().format('YYYY-MM-DD')) - f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD')),
      percent: f_percent(),
      chartData: _(data)
        .groupBy('date')
        .map((item: any, key: any) => {
          return {
            date: dayjs(key).format('YYYY-MM-DD'),
            death28: _.sumBy(item, 'death28'),
          };
        })
        .value(),
    };

    return array;
  });

export const getIpd = (state: RootState) =>
  createSelector(dataIpd, (ipd) => {
    const getData = getFilterData(ipd);
    const data = getData(state);

    const f_day = (t_date: any) =>
      _.filter(data, (x: any) => dayjs(x.date).format('YYYY-MM-DD') === t_date).reduce(
        (acc: any, amount: any) => acc + amount.covid_all,
        0,
      );

    const f_avg7 = (t_date: any) =>
      _.filter(data, (x: any) => x.date < dayjs().format('YYYY-MM-DD') && x.date >= t_date).reduce(
        (acc: any, amount: any) => acc + amount.covid_all,
        0,
      ) / 7;

    const f_percent = () => {
      const c = f_day(dayjs().format('YYYY-MM-DD')) - f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD'));
      return (c / f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD'))) * 100;
    };

    const array = {
      // หาข้อมูลเฉลี่ย 7 วัน
      avg7: f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD')),
      // หาข้อมูลเฉลี่ย วันปัจจุบัน
      toDay: f_day(dayjs().format('YYYY-MM-DD')),
      //Group Date เอาไปกราฟ
      calculate: f_day(dayjs().format('YYYY-MM-DD')) - f_avg7(dayjs().subtract(7, 'day').format('YYYY-MM-DD')),
      percent: f_percent(),
      chartData: _(data)
        .groupBy('date')
        .map((item: any, key: any) => {
          return {
            date: dayjs(key).format('YYYY-MM-DD'),
            ipd_covid_all: _.sumBy(item, 'covid_all'),
          };
        })
        .value(),
    };

    return array;
  });
