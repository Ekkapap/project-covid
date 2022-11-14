/* eslint-disable @typescript-eslint/no-unused-vars */
import { Area } from '@ant-design/plots';
import React, { Component, createRef } from 'react';
import { Col, Row, Button, Spin } from 'antd';
import type { RadioChangeEvent } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { screeningData } from 'src/constants/screening';
import { getScreeningPositiveWk } from 'src/reducers/selectors/screening';
import Tools from 'src/components/Tools';
import 'src/pages/style.less';
import { Trans, withTranslation } from 'react-i18next';
import moment from 'moment';
interface IProps {
  getChart: any;
  screencovids: any;
  t: any;
}

interface IState {
  data: any;
}

class ScreeningPositivePercent extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { data: [] };
  }

  render() {
    const { getChart, screencovids, t } = this.props;
    const config = {
      data: getChart,
      xField: 'date',
      yField: 'percent_p_wk',
      xAxis: {
        type: 'timeCat',
        legend: false,
        label: {
          formatter: (text: string) => dayjs(text).format('MMM'),
        },
        grid: null,
        line: null,
        tickCount: 3,
        //tickInterval: 25,
      },
      yAxis: {
        // label: null,
        // grid: null,
      },
      smooth: true,
      tooltip: {
        showMarkers: false,
        enterable: true,
        domStyles: {'g2-tooltip': {width: "auto",padding: "8px"}},
        customContent: (title: string, items: any[]) => {
          const data = items[0]?.data || {};
          return `
          <div class="custom-tooltip-item">${t('pages.screening.chart.screeningPercent.tooltip.date')} : ${moment(data.date).format('YYYY-MM-DD')}</div>
          <div class="custom-tooltip-item">${t('pages.screening.chart.screeningPercent.tooltip.t1')} : ${data.percent_p_wk}</div>`;
        }
      }
    };
    const ref = createRef<HTMLDivElement>();
    const chartData = {
      ref: ref,
      name: t('pages.screening.chart.screeningPercent.name'),
    };
    return (
      <div>
        <div ref={ref}>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]} style={{ minHeight: '600px' }}>
            <Col xs={24} md={24}>
              <label className='text-header'>{chartData.name}</label>
            </Col>
            <Col xs={24} md={24}>
              <label className='fs14'>
                <Trans>pages.screening.chart.screeningPercent.detail</Trans>
              </label>
            </Col>
            <Col xs={24} md={24} className='data-filter'>
              <Row gutter={[8, 8]}>
                <Col xs={8} md={5}>
                  <Button type='link'><Trans>chart.7days</Trans></Button>
                </Col>
                <Col xs={6} md={3}>
                  <Button type='link'><Trans>chart.daily</Trans></Button>
                </Col>
                <Col xs={10} md={6}>
                  <Button type='link'><Trans>chart.about</Trans></Button>
                </Col>
              </Row>
            </Col>
            <Col xs={24} md={24}>
              <Spin tip='Loading...' spinning={screencovids.isFetching}>
                <Area {...config} />
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
  const selector = getScreeningPositiveWk(state);
  return {
    getChart: selector(state),
    screencovids: state.screening,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ScreeningPositivePercent));
