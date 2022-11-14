import { createSelector } from 'reselect';
import { RootState } from '../index';
import _ from 'lodash';
import dayjs from 'dayjs';

import { central, chwpart_krung_thep, north, north_east, south } from 'src/constants/thaiaddress';
import { getFilterData } from './home';
// import { getFilterData } from './home';

const dummyState = (state: any) => state;
const otherDiseaseState = (state: any) => state.other_disease.data;
const screeningState = (state: any) => state.screening.data;

export const getOtherDisease = (items: any, state: RootState) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createSelector(dummyState, (dummy) => {
    const data = getFilterData(items)(state);

    const result: any = _(data)
      .groupBy('date')
      .map((row, date) => ({
        date: dayjs(date).format('YYYY-MM-DD'),
        type: 'dengue',
        value: _.sumBy(row, 'count'),
      }))
      .value();
    return result;
  });

export const getScreening = (items: any, state: RootState) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createSelector(dummyState, (dummy) => {
    const data = getFilterData(items)(state);

    const result: any = _(data)
      .groupBy('date')
      .map((row, date) => ({
        date: dayjs(date).format('YYYY-MM-DD'),
        type: 'covid-19',
        value: _.sumBy(row, 'total_p'),
      }))
      .value();
    return result;
  });

export const getReport = (state: RootState) =>
  createSelector(otherDiseaseState, screeningState, (other_disease, screening) => {
    return [...getOtherDisease(other_disease, state)(state), ...getScreening(screening, state)(state)];
  });

export const getOtherDiseaseRegion = (state: RootState, filter?: string) =>
  createSelector(otherDiseaseState, screeningState, (other_disease, screening) => {
    const dataDisease = _(other_disease)
      .groupBy('chw')
      .map(function (items, bdate) {
        return {
          type: 'Dengue',
          chwpart: bdate,
          value: _.sumBy(items, 'count'),
          rate_value: Math.ceil((_.sumBy(items, 'count') * 100000) / 700000),
        };
      })
      .value();

    const dataScreening = _(screening)
      .groupBy('chw')
      .map(function (items, bdate) {
        return {
          type: 'Covid19',
          chwpart: bdate,
          value: _.sumBy(items, 'total_p'),
          rate_value: Math.ceil((_.sumBy(items, 'total_p') * 100000) / 700000),
        };
      })
      .value();

    let data = [...dataDisease, ...dataScreening];

    switch (filter) {
      case 'krung_thep_maha_nakhon':
        data = _.filter(data, (x: any) => chwpart_krung_thep.has(Number(x.chwpart)));
        break;
      case 'central':
        data = _.filter(data, (x: any) => central.has(Number(x.chwpart)));
        break;
      case 'north':
        data = _.filter(data, (x: any) => north.has(Number(x.chwpart)));
        break;
      case 'north_east':
        data = _.filter(data, (x: any) => north_east.has(Number(x.chwpart)));
        break;
      case 'south':
        data = _.filter(data, (x: any) => south.has(Number(x.chwpart)));
        break;

      default:
        break;
    }

    return data;
  });
