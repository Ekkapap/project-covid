/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, createRef } from 'react';
import { Col, Row, Button, Spin } from 'antd';
import type { RadioChangeEvent } from 'antd';
import dayjs from 'dayjs';
import { Area } from '@ant-design/plots';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { getReportTypes } from 'src/reducers/selectors/screening';
import { screeningData } from 'src/constants/screening';
import Tools from 'src/components/Tools';
import 'src/pages/style.less';
import { Trans, withTranslation } from 'react-i18next';
interface IProps {
  dataReportTypes: any;
  screencovids: any;
  t: any;
}
interface IState {
  screeningType: string;
}
type TProps = IProps & any;
class ScreeningType extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { screeningType: 'RT-PCR' };
  }
  onChange = (e: RadioChangeEvent) => {
    this.setState({ screeningType: e.target.value });
  };
  render() {
    const { dataReportTypes, screencovids, t } = this.props;
    const config = {
      data: dataReportTypes,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      color: ['#c1c2c2', '#5794cb'],
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
        label: {
          formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
      legend: {
        position: 'bottom' as const,
      },
    };
    const ref = createRef<HTMLDivElement>();
    const chartData = {
      ref: ref,
      name: t('pages.screening.chart.screeningType.name'),
    };
    return (
      <div>
        <div ref={ref}>
          <Row className='card-body' gutter={[0, { xs: 16, md: 8 }]}>
            <Col xs={24} md={12}>
              <label className='text-header'>{chartData.name}</label>
            </Col>
            <Col xs={24} md={16}>
              <label className='fs14'><Trans>pages.screening.chart.screeningType.detail</Trans></label>
            </Col>
            <Col xs={24} md={24} className='data-filter'>
              <Row gutter={[8, 8]}>
                <Col xs={5} md={2}>
                  <Button type='link'><Trans>chart.daily</Trans></Button>
                </Col>
                <Col xs={7} md={2}>
                  <Button type='link'><Trans>chart.correct</Trans></Button>
                </Col>
                <Col xs={4} md={2}>
                  <Button type='link'><Trans>chart.table</Trans></Button>
                </Col>
                <Col xs={8} md={3}>
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
        <Tools xs={8} md={3} chartData={chartData} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const selector = getReportTypes(state);
  return {
    dataReportTypes: selector(state),
    screencovids: state.screening,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ScreeningType));
