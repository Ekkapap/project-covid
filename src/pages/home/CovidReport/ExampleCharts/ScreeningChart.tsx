import React, { PureComponent } from 'react';
import { Line } from '@ant-design/plots';
import dayjs from 'dayjs';
import _ from 'lodash';

interface ExProps {
  data: [];
}

class ScreeningChart extends PureComponent<ExProps> {
  render() {
    const config = {
      data: _.sortBy(this.props.data, 'date'),
      // padding: 'auto',
      height: 200,
      xField: 'date',
      yField: 'total',

      xAxis: {
        type: 'timeCat',
        legend: false,
        label: {
          formatter: (text: string) => dayjs(text).format('MMM'),
        },
        grid: null,
        line: null,
        // tickI: 5000,
      },
      yAxis: {
        label: null,
        grid: null,
      },
    };

    return <Line {...config} />;
  }
}

export default ScreeningChart;
