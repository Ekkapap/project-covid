import { createSelector } from 'reselect';
import { RootState } from '../index';
import dayjs from 'dayjs';
import { getFilterData } from './home';
import _ from 'lodash';

const ipdState = (state: any) => state.ipd;

export const getIpdReport = (state: RootState) =>
  createSelector(ipdState, (ipddata) => {
    const filterData = getFilterData(ipddata.data)(state);

    const getData7: any = _.filter(filterData, function (item) {
      return dayjs(item.date) >= dayjs().subtract(7, 'day') && dayjs(item.date) <= dayjs();
    });

    const arr: any = {
      admit7day: _.sumBy(getData7, 'admit'),
      admit: _.sumBy(filterData, 'admit'),
      ipt: _.sumBy(
        _.filter(filterData, function (x: any) {
          return dayjs(x.date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
        }),
        'covid_all',
      ),
      vent: _.sumBy(
        _.filter(filterData, function (x: any) {
          return dayjs(x.date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
        }),
        'vent',
      ),
    };

    return arr;
  });

export const getIpdChart = (state: RootState) =>
  createSelector(ipdState, (ipddata) => {
    const filterData = getFilterData(ipddata.data)(state);
    const grouped = _(filterData)
      .orderBy('date')
      .groupBy('date')
      .map((platform, date) => ({
        date: date,
        admit: _.sumBy(platform, 'admit'),
        covid_all: _.sumBy(platform, 'covid_all'),
        vent: _.sumBy(platform, 'vent'),
      }))
      .value();

    const transform = grouped.map((item: any) => {
      const deathWeekly = (date: any, type: string) =>
        Math.ceil(
          _.filter(grouped, (x: any) => x.date < item.date && x.date >= date).reduce(
            type == 'admit'
              ? (acc: any, amount: any) => acc + amount.admit
              : type == 'covid_all'
              ? (acc: any, amount: any) => acc + amount.covid_all
              : type == 'vent'
              ? (acc: any, amount: any) => acc + amount.vent
              : () => 0,
            0,
          ) / 7,
        );

      // const vaccineSum = (type: string) =>
      //   Math.ceil(
      //     (_.filter(grouped, (x: any) => x.date < item.date).reduce(
      //       type == 'cdeath'
      //         ? (acc: any, amount: any) => acc + amount.cdeath
      //         : type == 'death28'
      //         ? (acc: any, amount: any) => acc + amount.death28
      //         : () => 0,
      //       0,
      //     ) *
      //       100) /
      //       650000, //จำนวนประชากรทั้งหมด อายุ12ขึ้นไป
      //   );
      const day7 = dayjs(item.date).subtract(7, 'day').format();
      const day = dayjs(item.date).format('YYYY-MM-DD');

      return {
        date: day,
        admit: item.admit,
        covid_all: item.covid_all,
        vent: item.vent,
        weekly_admit: deathWeekly(day7, 'admit'),
        weekly_covid_all: deathWeekly(day7, 'covid_all'),
        weekly_vent: deathWeekly(day7, 'vent'),
      };
    });

    return transform;
  });
