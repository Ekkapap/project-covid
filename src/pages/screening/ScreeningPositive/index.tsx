/* eslint-disable @typescript-eslint/no-unused-vars */
import { Area, DualAxes } from '@ant-design/plots';
import React, { Component, createRef } from 'react';
import { Col, Row, Radio, Button, Spin } from 'antd';
import type { RadioChangeEvent } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { screeningData } from 'src/constants/screening';
import { getDataReportDashboard, getScreeningPositiveChart } from 'src/reducers/selectors/screening';
import Tools from 'src/components/Tools';
import 'src/pages/style.less';
import { Trans, withTranslation } from 'react-i18next';
import moment from 'moment';
interface IProps {
  getReport: any;
  getReportChart: any;
  screencovids: any;
  t: any;
}

interface IState {
  data: any;
  nationality: string;
}

class ScreeningPositive extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { data: [], nationality: 'THAI' };
  }
  onChange = (e: RadioChangeEvent) => {
    this.setState({ ...this.state, nationality: e.target.value });
  };
  render() {
    const { getReport, getReportChart, screencovids, t } = this.props;
    const ref = createRef<HTMLDivElement>();
    const chartData = {
      ref: ref,
      name: t('pages.screening.chart.screeningPositive.name'),
    };
    const config = {
      data: [getReportChart, getReportChart],
      xField: 'date',
      yField: ['total_p', 'avg_p_wk'],
      geometryOptions: [
        {
          geometry: 'column',
          color: '#586bce',
        },
        {
          geometry: 'line',
          color: '#29cae4',
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
        //tickCount: getReportChart.length / 2,
        tickCount: 5,
        grid: null,
      },
      legend: {
        itemName: {
          formatter: (text: any, item: any) => {
            return item.value === 'total_p' ? 
            t('pages.screening.chart.screeningPositive.bar') : 
            t('pages.screening.chart.screeningPositive.line');
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
          <div class="custom-tooltip-item">${t('pages.screening.chart.screeningPositive.tooltip.date')} : ${moment(data.date).format('YYYY-MM-DD')}</div>
          <div class="custom-tooltip-item">${t('pages.screening.chart.screeningPositive.tooltip.all')} : ${data.total_p}</div>
          <div class="custom-tooltip-item">${t('pages.screening.chart.screeningPositive.tooltip.lastweek')} : ${data.avg_p_wk}</div>`;
        }
      }
    };
    
    return (
      <div>
        <Row style={{ marginBottom: '1rem' }}>
          <Col xs={24} md={24}>
            <Row gutter={[8, { xs: 16, md: 8 }]}>
              <Col xs={14} md={6}>
                <Row>
                  <Col className='text-header'><Trans>pages.screening.chart.screeningPositive.title1</Trans></Col>
                </Row>
                <Row>
                  <Col xs={12} md={10} className='number-link-label'>
                    <Trans>chart.past7</Trans>
                  </Col>
                  <Col xs={12} md={10} className='number-link-label'>
                    <Trans>chart.total</Trans>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={10}>
                    <span className='number-link'>
                      {(getReport.screening_pos_weekly || 0).toLocaleString('en', { useGrouping: true })}
                    </span>
                  </Col>
                  <Col xs={12} md={10}>
                    <span className='number-link'>
                      {(getReport.screening_pos_all || 0).toLocaleString('en', { useGrouping: true })}
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <div ref={ref}>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
            <Col xs={24} md={12}>
              <label className='text-header'>{chartData.name}</label>
            </Col>
            {/* <Col xs={24} md={12} className='radio-nation'>
              <Radio.Group onChange={this.onChange} value={this.state.nationality}>
                <Radio className='fs14' value='THAI'>
                  <Trans>chart.thai</Trans>
                </Radio>
                <Radio className='fs14' value='FOREIGNER'>
                  <Trans>chart.foreigner</Trans>
                </Radio>
              </Radio.Group>
            </Col> */}
            <Col xs={24} md={16}>
              <label className='fs14'>
                <Trans>pages.screening.chart.screeningPositive.detail</Trans>
              </label>
            </Col>
            <Col xs={24} md={24} className='data-filter'>
              <Row gutter={[8, 8]}>
                <Col xs={5} md={2}>
                  <Button type='link'><Trans>chart.today</Trans></Button>
                </Col>
                <Col xs={7} md={2}>
                  <Button type='link'><Trans>chart.correct</Trans></Button>
                </Col>
                <Col xs={4} md={2}>
                  <Button type='link'><Trans>chart.daily</Trans></Button>
                </Col>
                <Col xs={8} md={3}>
                  <Button type='link'><Trans>chart.about</Trans></Button>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={24}>
              <Spin tip='Loading...' spinning={screencovids.isFetching}>
                <DualAxes {...config} />
              </Spin>
            </Col>
          </Row>
        </div>
        <Tools xs={8} md={5} chartData={chartData} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const selector = getDataReportDashboard(state);
  const selector2 = getScreeningPositiveChart(state);

  return {
    getReport: selector(state),
    getReportChart: selector2(state),
    screencovids: state.screening,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ScreeningPositive));
