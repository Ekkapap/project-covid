/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, createRef } from 'react';
import { Col, Row, Button, Spin } from 'antd';
import dayjs from 'dayjs';
import { DualAxes } from '@ant-design/plots';
import { connect } from 'react-redux';
import { Trans, withTranslation } from 'react-i18next';
import { RootState } from 'src/reducers';
import { getScreeningReportChart } from 'src/reducers/selectors/screening';
import Tools from 'src/components/Tools';
import 'src/pages/style.less';
import moment from 'moment';
type IProps = {
  reportChart: any;
  screencovids: any;
  t: any;
};
type IState = {
  data: any;
  nationality: string;
  chartData: { ref: any; name: string; instance: any; };
};

class ScreeningReport extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...this.state,
      nationality: 'THAI',
      chartData: { ref: null, name: '', instance: null },
    };
  }

  render() {
    const { reportChart, t, screencovids } = this.props;
    const ref = createRef<HTMLDivElement>();
    const chartData = {
      ref: ref,
      name: t('pages.screening.chart.screeningReport.title1')
    };
    const config = {
      data: [reportChart, reportChart],
      xField: 'date',
      yField: ['total', 'total_wk'],
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

          formatter: (text: string) => dayjs(text).format('MMM'),
        },
        tickCount: 5,
      },
      legend: {
        itemName: {
          formatter: (text: any, item: any) => {
            return item.value === 'total' ? 
            t('pages.screening.chart.screeningReport.bar') : 
            t('pages.screening.chart.screeningReport.line');
          },
        },
      },
      tooltip: {
        showMarkers: false,
        enterable: true,
        domStyles: {'g2-tooltip': {width: "auto",padding: "8px"}},
        customContent: (title: string, items: any[]) => {
          const data = items[0]?.data || {};
          return `
          <div class="custom-tooltip-item">${t('pages.screening.chart.screeningReport.tooltip.date')} : ${moment(data.date).format('YYYY-MM-DD')}</div>
          <div class="custom-tooltip-item">${t('pages.screening.chart.screeningReport.tooltip.all')} : ${data.total}</div>
          <div class="custom-tooltip-item">${t('pages.screening.chart.screeningReport.tooltip.lastweek')} : ${data.total_wk}</div>`;
        },
      },
    };

    return (
      <div>
        <div ref={ref}>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
            <Col xs={24} md={24}>
              <label className='text-header'>{chartData.name}</label>
            </Col>
            <Col xs={24} md={16}>
              <label className='fs14'>
                <Trans>pages.screening.chart.screeningReport.detail</Trans>
              </label>
            </Col>
            <Col xs={24} md={24} className='data-filter'>
              <Row gutter={[8, 8]}>
                <Col xs={5} md={2}>
                  <Button type='link'>
                    <Trans>chart.daily</Trans>
                  </Button>
                </Col>
                <Col xs={7} md={2}>
                  <Button type='link'>
                    <Trans>chart.correct</Trans>
                  </Button>
                </Col>
                <Col xs={4} md={2}>
                  <Button type='link'>
                    <Trans>chart.table</Trans>
                  </Button>
                </Col>
                <Col xs={8} md={3}>
                  <Button type='link'>
                    <Trans>chart.about</Trans>
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={24}>
              <Spin tip='Loading...' spinning={screencovids.isFetching}>
                <DualAxes {...config} />
                {/* onReady={this.onChartReady}  */}
              </Spin>
            </Col>
          </Row>
        </div>
        <Tools xs={8} md={3} chartData={chartData} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const selector2 = getScreeningReportChart(state);

  return {
    reportChart: selector2(state),
    screencovids: state.screening,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ScreeningReport));
