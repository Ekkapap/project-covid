import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { RootState } from 'src/reducers';
import { ReinfectedData, Screening } from 'src/types';
import dayjs from 'dayjs';
import { CHWPART } from 'src/constants/changwat';

interface IProps {
  chw: string;
  covidcase: Screening[];
  // data: ReinfectedData[];
}

class ChwRow extends Component<IProps> {
  render() {
    const { chw, covidcase } = this.props;

    const totalCase = _.sumBy(
      covidcase.filter((x) => x.chw === chw),
      'total_p',
    );

    return (
      <tr style={{ background: '#031F5F', color: 'white', fontSize: 16 }}>
        <td style={{ background: '#2A94D3', color: 'white', fontSize: 16, padding: 4 }} align='center'>
          จังหวัด{CHWPART.find((x) => x.chwcode === chw)?.chwname}
        </td>
        <td style={{ fontSize: 16, padding: 4 }} align='center'>
          {totalCase}
        </td>
        <td style={{ fontSize: 16, padding: 4 }} align='center'>
          {/* {reinfected} */}
        </td>
        <td style={{ fontSize: 16, padding: 4 }} align='center'>
          {/* {firstInLastWeek} */}
        </td>
        <td style={{ fontSize: 16, padding: 4 }} align='center'>
          {/* {reinfectedLastInWeek} */}
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

const mapStateToProps = (state: RootState) => ({
  covidcase: state.screening.data,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChwRow);
