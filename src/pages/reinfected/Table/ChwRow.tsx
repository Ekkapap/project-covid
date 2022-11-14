import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { RootState } from 'src/reducers';
import { ReinfectedData } from 'src/types';
import dayjs from 'dayjs';
import { CHWPART } from 'src/constants/changwat';

interface IProps {
  chw: string;
  data: ReinfectedData[];
}

interface Infected {
  cid: string;
  infected: ReinfectedData[];
}

class ChwRow extends Component<IProps> {
  render() {
    const { chw, data } = this.props;

    const groupPatient = _.chain(data)
      .groupBy('cid')
      .toPairs()
      .map((item) => {
        return _.zipObject(['cid', 'infected'], item);
      })
      .value();

    const reinfected = groupPatient.filter((x) => x.infected.length > 1).length;

    const week = dayjs().subtract(1, 'week');

    const firstInLastWeek = groupPatient.filter((x) => {
      const infected: any = x.infected;
      return infected.length === 1 && dayjs(infected[0].vstdate).isAfter(week);
    }).length;

    const reinfectedLastInWeek = groupPatient.filter((x) => {
      const infected: any = x.infected;
      return (
        infected.length > 1 && infected.filter((inf: ReinfectedData) => dayjs(inf.vstdate).isAfter(week)).length > 0
      );
    }).length;

    return (
      <tr style={{ background: '#031F5F', color: 'white', fontSize: 16 }}>
        <td style={{ background: '#2A94D3', color: 'white', fontSize: 16, padding: 4 }} align='center'>
          จังหวัด{CHWPART.find((x) => x.chwcode === chw)?.chwname}
        </td>
        <td style={{ fontSize: 16, padding: 4 }} align='center'>
          {groupPatient.length}
        </td>
        <td style={{ fontSize: 16, padding: 4 }} align='center'>
          {reinfected}
        </td>
        <td style={{ fontSize: 16, padding: 4 }} align='center'>
          {firstInLastWeek}
        </td>
        <td style={{ fontSize: 16, padding: 4 }} align='center'>
          {reinfectedLastInWeek}
        </td>

        <td style={{ fontSize: 16, padding: 4 }} align='center'>
          ?
        </td>
        <td style={{ fontSize: 16, padding: 4 }} align='center'>
          ?
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChwRow);
