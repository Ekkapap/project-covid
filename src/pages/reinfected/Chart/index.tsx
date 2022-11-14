/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { Col, Row, Slider } from 'antd';
import { DualAxes } from '@ant-design/plots';
import Filter from 'src/components/Filter';
import { ReinfectedData, Screening } from 'src/types';
import _ from 'lodash';
import dayjs from 'dayjs';

interface IProps {
  covidcase: Screening[];
  reinfectedData: ReinfectedData[];
}

interface IState {
  timePeriod: [number, number];
}

class Chart extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      timePeriod: [0, 365],
    };
  }

  onAfterChange = (value: [number, number]) => {
    this.setState({ timePeriod: value });
  };

  render() {
    const { timePeriod } = this.state;
    const { covidcase, reinfectedData } = this.props;

    const current = dayjs();

    const start = current.subtract(365 - timePeriod[0], 'day').format('YYYY-MM-DD');
    const end = current.subtract(365 - timePeriod[1], 'day').format('YYYY-MM-DD');

    const covid = _(covidcase.filter((x) => x.date && x.date > start && x.date < end))
      .groupBy((x) => dayjs(x.date).format('YYYY-MM-DD'))
      .map((item: Screening[], key: any) => {
        return {
          date: key,
          covid_case: _.sumBy(item, 'total_p'),
        };
      })
      .sortBy('date', 'asc')
      .value();

    const reinfected = _(reinfectedData.filter((x) => x.date > start && x.date < end))
      .groupBy((x) => x.date)
      .map((item: ReinfectedData[], key: any) => {
        return {
          date: key,
          reinfected: _.sumBy(item, 'reinfected'),
        };
      })
      .sortBy('date', 'asc')
      .value();

    console.log(
      'reinfectedData',
      reinfectedData.filter((x) => x.date === '2022-01-11'),
    );
    console.log('reinfected', reinfected);

    const config = {
      data: [covid, reinfected],
      xField: 'date',
      yField: ['covid_case', 'reinfected'],
      geometryOptions: [
        {
          geometry: 'column',
          color: '#586bce',
        },
        {
          geometry: 'line',
          color: 'red',
        },
      ],
      xAxis: {
        type: 'timeCat',
        legend: false,
        label: {
          autoRotate: true,
          autoHide: false,
          autoEllipsis: false,

          // formatter: (text: string) => dayjs(text).format('MMM'),
        },
        tickCount: 5,
      },
      // legend: {
      //   itemName: {
      //     formatter: (text: any, item: any) => {
      //       return item.value === 'total' ?
      //       t('pages.screening.chart.screeningReport.bar') :
      //       t('pages.screening.chart.screeningReport.line');
      //     },
      //   },
      // },
      // tooltip: {
      //   showMarkers: false,
      //   enterable: true,
      //   domStyles: {'g2-tooltip': {width: "auto",padding: "8px"}},
      //   customContent: (title: string, items: any[]) => {
      //     const data = items[0]?.data || {};
      //     return `
      //     <div class="custom-tooltip-item">${t('pages.screening.chart.screeningReport.tooltip.date')} : ${moment(data.date).format('YYYY-MM-DD')}</div>
      //     <div class="custom-tooltip-item">${t('pages.screening.chart.screeningReport.tooltip.all')} : ${data.total}</div>
      //     <div class="custom-tooltip-item">${t('pages.screening.chart.screeningReport.tooltip.lastweek')} : ${data.total_wk}</div>`;
      //   },
      // },
    };

    return (
      <div>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={6} md={6}>
            <div>Time Period</div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div>{start}</div> <div>{end}</div>
            </div>
            <Slider
              range
              step={1}
              defaultValue={[0, 365]}
              // tooltipVisible={false}
              tipFormatter={(x) => current.subtract(365 - (x || 0), 'day').format('YYYY-MM-DD')}
              max={365}
              onAfterChange={this.onAfterChange}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: '0.8rem' }}>
          <Col xs={24} md={24}>
            <Filter />
          </Col>
        </Row>
        <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
          <Col xs={24} md={24}>
            <DualAxes {...config} />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    covidcase: state.screening.data,
    reinfectedData: state.reinfected.data,
  };
};

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
