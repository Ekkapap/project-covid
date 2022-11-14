import React, { Component } from 'react';
import { DualAxes } from '@ant-design/plots';
import dayjs from 'dayjs';

function randn_bm(min: any, max: any, skew: any) {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
  else {
    num = Math.pow(num, skew); // Skew
    num *= max - min; // Stretch to fill range
    num += min; // offset to min
  }
  return num;
}

const DemoDualAxes = () => {
  const data: any = [];

  const start = '2020-08-20';

  new Array(90).fill(undefined).map((x, index) => {
    data.push({
      time: dayjs(start).add(index, 'day').format('YYYY-MM-DD'),
      dailyDeath: randn_bm(100, 1000, 3),
      // average7DayDeath: randn_bm(-500, 1000, 1),
    });
  });

  const config: any = {
    data: [data, data],
    xField: 'time',
    yField: ['dailyDeath', 'average7DayDeath'],
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
      tickCount: 5,
    },

    limitInPlot: false,
    padding: [20, 20, 20, 20],
    meta: {
      time: {
        sync: true,
      },
    },
    legend: false,
    geometryOptions: [
      {
        geometry: 'column',
      },
      {
        geometry: 'line',
      },
    ],
    // tooltip: {
    //   showMarkers: false,
    // },
    // state: {
    //   active: {
    //     style: {
    //       shadowBlur: 4,
    //       stroke: '#000',
    //       fill: 'red',
    //     },
    //   },
    // },
    // interactions: [
    //   {
    //     type: 'marker-active',
    //   },
    // ],
  };

  return <DualAxes {...config} />;
};

class DeathChart extends Component {
  render() {
    return <DemoDualAxes />;
  }
}

export default DeathChart;
