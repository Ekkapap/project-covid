import { createSelector } from 'reselect';
import { RootState } from '../index';
import _ from 'lodash';
import dayjs from 'dayjs';

const dataScreening = (state: RootState) => state.screening.data;
const dataVaccine = (state: RootState) => state.vaccine.data;
const dataIpd = (state: RootState) => state.ipd.data;
const dataDeathCovid = (state: RootState) => state.death.covid.data;
const dataExCovid = (state: RootState) => state.death.excessmortality.data;
const dataOtherDisease = (state: RootState) => state.other_disease.data;

export const getCheckData = (state: RootState) =>
  createSelector(
    dataScreening,
    dataVaccine,
    dataIpd,
    dataDeathCovid,
    dataExCovid,
    dataOtherDisease,
    (screening, vaccine, ipd, death, ex_death, other_disease) => {
      const date_last = (x: any) => _(x).orderBy('date', 'desc').take(1).value();
      const arr = [
        {
          type: 'screening',
          record: _.size(screening),
          date_last: _.size(screening) > 0 && dayjs(date_last(screening)[0].date).format('YYYY-MM-DD'),
        },
        {
          type: 'vaccine',
          record: _.size(vaccine),
          date_last: _.size(vaccine) > 0 && dayjs(date_last(vaccine)[0].date).format('YYYY-MM-DD'),
        },
        {
          type: 'ipd',
          record: _.size(ipd),
          date_last: _.size(ipd) > 0 && dayjs(date_last(ipd)[0].date).format('YYYY-MM-DD'),
        },
        {
          type: 'death',
          record: _.size(death),
          date_last: _.size(death) > 0 && dayjs(date_last(death)[0].date).format('YYYY-MM-DD'),
        },

        {
          type: 'ex_death',
          record: _.size(ex_death),
          date_last: _.size(ex_death) > 0 && dayjs(date_last(ex_death)[0].date).format('YYYY-MM-DD'),
        },
        {
          type: 'other_disease',
          record: _.size(other_disease),
          date_last: _.size(other_disease) > 0 && dayjs(date_last(other_disease)[0].date).format('YYYY-MM-DD'),
        },
      ];

      return arr;
    },
  );
