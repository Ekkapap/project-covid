import { Card } from 'antd';
import React, { Component } from 'react';
import { DualAxes } from '@ant-design/plots';

interface IProps {
  data: any[];
}
class VaccineRate extends Component<IProps> {
  render() {
    const { data } = this.props;

    const config = {
      data: [data, data],
      xField: 'date',
      yField: ['value', 'total'],
      geometryOptions: [
        {
          geometry: 'column',
          isStack: true,
          seriesField: 'type',
        },
        {
          geometry: 'line',
        },
      ],
    };

    return (
      <Card title='Vaccine Rate' bordered={false}>
        <DualAxes {...config} />
      </Card>
    );
  }
}

export default VaccineRate;
