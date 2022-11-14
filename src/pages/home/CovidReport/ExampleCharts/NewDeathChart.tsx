import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line } from '@ant-design/plots';
import dayjs from 'dayjs';
import _ from 'lodash';
import { RootState } from 'src/reducers';
import { getDeath28 } from 'src/reducers/selectors/home';

interface IProps {
  getDeath28: any;
}

class NewDeathChart extends Component<IProps> {
  shouldComponentUpdate(prevProps: any) {
    return (
      _.reduce(
        this.props,
        function (result, value, key: any) {
          return _.isEqual(value, prevProps[key]) ? result : result.concat(key);
        },
        [],
      ).length > 0
    );
  }

  render() {
    const config = {
      data: _.sortBy(this.props.getDeath28, 'date'),
      // padding: 'auto',
      height: 200,
      xField: 'date',
      yField: 'death28',

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

const mapStateToProps = (state: RootState) => {
  const selectorDeath = getDeath28(state);

  return {
    getDeath28: selectorDeath(state).chartData,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDeathChart);
