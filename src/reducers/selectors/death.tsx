import { createSelector } from 'reselect';
import { RootState } from '../index';
import _ from 'lodash';
import { getChwpartFilter, getFilterData, getHospcodeFilter, getAmppartFilter, getTmbpartFilter } from './home';
import dayjs from 'dayjs';
import { central, chwpart_krung_thep, north, north_east, south } from 'src/constants/thaiaddress';
import { Death } from 'src/types';
import config from 'src/config/config';
//import { hospitalpart } from 'src/constants/hospital';

const data = (state: RootState) => state.death.covid.data;
const exdeath = (state: RootState) => state.death.excessmortality.data;

export function getDeathData(state: RootState) {
  return createSelector(data, (items) => {
    const filterData = getFilterData(items)(state);
    const filter7day = _.filter(filterData, function (item) {
      return item.date >= dayjs().subtract(7, 'day').format() && item.date <= dayjs().format();
    });

    const result: any = {
      death28: _.sumBy(filterData, 'death28'),
      death7day: _.sumBy(filter7day, 'cdeath'),
      deathAll: _.sumBy(filterData, 'cdeath'),
    };

    return result;
  });
}

export function getDeathChart(state: RootState) {
  return createSelector(data, (items) => {
    const filterData = getFilterData(items)(state);
    const grouped = _(filterData)
      .orderBy('date')
      .groupBy('date')
      .map((platform, date) => ({
        date: date,
        cdeath: _.sumBy(platform, 'cdeath'),
        death28: _.sumBy(platform, 'death28'),
      }))
      .value();

    const transform = grouped.map((item: any) => {
      const deathWeekly = (date: any, type: string) =>
        Math.ceil(
          _.filter(grouped, (x: any) => x.date < item.date && x.date >= date).reduce(
            type == 'cdeath'
              ? (acc: any, amount: any) => acc + amount.cdeath
              : type == 'death28'
              ? (acc: any, amount: any) => acc + amount.death28
              : () => 0,
            0,
          ) / 7,
        );

      const vaccineSum = (type: string) =>
        Math.ceil(
          (_.filter(grouped, (x: any) => x.date < item.date).reduce(
            type == 'cdeath'
              ? (acc: any, amount: any) => acc + amount.cdeath
              : type == 'death28'
              ? (acc: any, amount: any) => acc + amount.death28
              : () => 0,
            0,
          ) *
            100) /
            650000, //จำนวนประชากรทั้งหมด อายุ12ขึ้นไป
        );
      const day7 = dayjs(item.date).subtract(7, 'day').format();
      const day = dayjs(item.date).format('YYYY-MM-DD');

      return {
        date: day,
        cdeath: item.cdeath,
        death28: item.death28,
        weekly_cdeath: deathWeekly(day7, 'cdeath'),
        weekly_death28: deathWeekly(day7, 'death28'),
        percent_cdeath: vaccineSum('cdeath'),
        percent_death28: vaccineSum('death28'),
      };
    });

    return transform;
  });
}

export const getDeathArea = (state: RootState, area: any) =>
  createSelector(data, (items) => {
    let dataAll = [];

    const filterData = getFilterData(items)(state);

    switch (area) {
      case 'krung_thep_maha_nakhon':
        dataAll = _.filter(filterData, (x: any) => chwpart_krung_thep.has(Number(x.chw)));

        break;
      case 'central':
        dataAll = _.filter(filterData, (x: any) => central.has(Number(x.chw)));

        break;
      case 'north':
        dataAll = _.filter(filterData, (x: any) => north.has(Number(x.chw)));

        break;
      case 'north_east':
        dataAll = _.filter(filterData, (x: any) => north_east.has(Number(x.chw)));

        break;
      case 'south':
        dataAll = _.filter(filterData, (x: any) => south.has(Number(x.chw)));

        break;

      default:
        break;
    }

    const death28 = _(dataAll)
      .groupBy('chw')
      .map(function (items, chw) {
        return {
          chwpart: chw,
          death28: _.sumBy(items, 'death28'),
          rate_death28: Math.ceil((_.sumBy(items, 'death28') * 100000) / 650000),
        };
      })
      .value();

    const arr = { death28 };
    console.log(arr);
    return arr;
  });

export const getExcessMortalityDeathSelector = createSelector(
  exdeath,
  getHospcodeFilter,
  getChwpartFilter,
  (death, hospcode, chwpart) => {
    let dataAll: Death[] = death;

    if (hospcode?.selectedItemsCode?.length > 0) {
      dataAll = dataAll.filter((x) => hospcode.selectedItemsCode.includes(x.hcode));

      dataAll = _.orderBy(dataAll, (x) => x.date);

      const groupData: any = _(dataAll)
        .groupBy((x) => `${x.hcode}-${dayjs(x.date).format('YYYY-MM-01')}`)
        .map((item: Death[]) => {
          return {
            date: dayjs(item[0].date).format('YYYY-MM-01'),
            hcode: item[0].hcode,
            prev_count: 0,
            count: _.sumBy(item, 'count'),
          };
        })
        .value() as any;

      const transform = groupData
        .map((x: any) => {
          const prev_count = groupData.find(
            (prev: any) => x.hcode === prev.hcode && dayjs(x.date).subtract(1, 'year').isSame(prev.date),
          )?.count;
          return {
            date: x.date,
            hcode: x.hcode,
            prev_count,
            count: x.count,
            percent: prev_count && Math.floor(((x.count - prev_count) / prev_count) * 100),
          };
        })
        .filter((x: any) => x.percent);

      return transform;
    } else if (chwpart?.selectedItemsCode?.length > 0) {
      dataAll = dataAll.filter((x) => chwpart.selectedItemsCode.includes(x.chw));

      dataAll = _.orderBy(dataAll, (x) => x.date);

      const groupData: any = _(dataAll)
        .groupBy((x) => `${x.chw}-${dayjs(x.date).format('YYYY-MM-01')}`)
        .map((item: Death[]) => {
          return {
            date: dayjs(item[0].date).format('YYYY-MM-01'),
            hcode: item[0].chw,
            prev_count: 0,
            count: _.sumBy(item, 'count'),
          };
        })
        .value() as any;

      const transform = groupData
        .map((x: any) => {
          const prev_count = groupData.find(
            (prev: any) => x.hcode === prev.hcode && dayjs(x.date).subtract(1, 'year').isSame(prev.date),
          )?.count;

          return {
            date: x.date,
            hcode: x.hcode,
            prev_count,
            count: x.count,
            percent: prev_count && Math.floor(((x.count - prev_count) / prev_count) * 100),
          };
        })
        .filter((x: any) => x.percent);

      return transform;
    } else {
      const dd = _(death)
        .groupBy((x) => `${dayjs(x.date).format('YYYY-MM-01')}`)
        .map((item: Death[], key: any) => {
          return {
            date: key,
            prev_count: 0,
            count: _.sumBy(item, 'count'),
          };
        })
        .value() as any;

      return dd
        .map((x: any) => {
          const prev_count = dd.find((prev: any) => dayjs(x.date).subtract(1, 'year').isSame(prev.date))?.count;
          return {
            date: x.date,
            prev_count,
            count: x.count,
            percent: prev_count && Math.floor(((x.count - prev_count) / prev_count) * 100),
          };
        })
        .filter((x: any) => x.percent);
    }

    return dataAll;
  },
);

export const getExcessMortalityTableSelector = createSelector(
  exdeath,
  getChwpartFilter,
  getAmppartFilter,
  getTmbpartFilter,
  getHospcodeFilter,
  (death, chwpart, amp, tmb, hospart) => {
    //const dataAll: Death[] = death;

    const maxDate = config.data_as;

    let groupData = _(death).filter((x) => x.date <= maxDate);

    if (typeof chwpart === 'string') {
      groupData = groupData.filter((x) => x.chw === chwpart);
    }
    if (amp !== 'ทุกอำเภอ') {
      groupData = groupData.filter((x) => x.amp === amp);
    }
    if (tmb !== 'ทุกตำบล') {
      groupData = groupData.filter((x) => x.tmb === tmb);
    }
    if (typeof hospart === 'string' && hospart !== 'ทุกหน่วยงาน') {
      groupData = groupData.filter((x) => x.hcode === hospart);
    }

    const current = dayjs(maxDate);

    groupData = groupData
      .groupBy('hcode')
      .map((item: Death[], key: any) => {
        const data6month = item.filter((x) => dayjs(x.date).isBetween(current.subtract(6, 'month'), current));

        const data12month = item.filter((x) =>
          dayjs(x.date).isBetween(current.subtract(12, 'month'), current.subtract(6, 'month')),
        );
        const data18month = item.filter((x) =>
          dayjs(x.date).isBetween(current.subtract(18, 'month'), current.subtract(12, 'month')),
        );

        const sum6monthDeath = _.sumBy(data6month, 'count');
        const sum12monthDeath = _.sumBy(data12month, 'count');
        const sum18monthDeath = _.sumBy(data18month, 'count');

        return {
          hcode: key,

          death_first_q: sum12monthDeath && Math.floor(((sum6monthDeath - sum12monthDeath) / sum12monthDeath) * 100),
          death_second_q: sum18monthDeath && Math.floor(((sum12monthDeath - sum18monthDeath) / sum18monthDeath) * 100),
          count: _.sumBy(item, 'count'),
        };
      })
      .value() as any;

    console.log(
      'dd',
      groupData.filter((x: any) => x.hcode === '10710'),
    );

    return groupData;
  },
);
