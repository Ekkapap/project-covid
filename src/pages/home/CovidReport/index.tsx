import { Card, Col, Row, Spin, Tag, Typography } from 'antd';
import React, { Component } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import NewCaseChart from './ExampleCharts/NewCaseChart';
import NewDeathChart from './ExampleCharts/NewDeathChart';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { getApPositive, getApScreening, getDeath28, getIpd } from 'src/reducers/selectors/home';
import i18n from 'src/i18n';
import moment from 'moment';
import NewIpdChart from './ExampleCharts/NewIpdChart';
import ScreeningChart from './ExampleCharts/ScreeningChart';
const { Text } = Typography;

interface IProps {
  getPositive: any;
  getScreening: any;
  getDeath28: any;
  getIpd: any;
  getStateScreening: any;
  getStateDeath28: any;
  getStateIpd: any;
}

type TProps = IProps;

class CovidReport extends Component<TProps> {
  render() {
    const { getPositive, getScreening, getDeath28, getIpd, getStateScreening, getStateDeath28, getStateIpd } =
      this.props;
    const date = i18n.t('pages.home.chart.vac_rep.data_as', { date: moment().toDate() });

    return (
      <Row gutter={[8, 8]}>
        <Col xs={24} md={6}>
          <Card bodyStyle={{ padding: '0' }} style={{ padding: 10 }}>
            <label>
              <Text type='secondary' style={{ fontSize: 12 }}>
                <Trans>pages.home.chart.covid_rep.cased</Trans>
              </Text>
            </label>
            <br></br>
            <label>
              <Text strong style={{ fontSize: 14 }}>
                <Trans>pages.home.chart.covid_rep.active_covid_cases</Trans>
              </Text>
            </label>
            <br></br>
            <label>
              <Text type='secondary' style={{ fontSize: 12 }}>
                {date}
              </Text>
            </label>
            <div style={{ height: 10 }}></div>
            <label>
              <Text type='secondary' style={{ fontSize: 12 }}>
                <Trans>pages.home.chart.covid_rep.seven_day_avg</Trans>
              </Text>
            </label>

            <Spin tip='Loading...' spinning={getStateScreening.isFetching}>
              <div style={{ margin: 'auto' }}>
                <label>
                  <Text strong style={{ fontSize: 14 }}>
                    {parseInt(getPositive.avg7)}
                  </Text>
                </label>
                &nbsp;
                {getPositive.calculate <= 0 ? (
                  <Tag color='green'>
                    {getPositive.calculate === 0 ? '' : <ArrowDownOutlined />} {parseInt(getPositive.calculate)} (
                    {getPositive.percent || 0})
                  </Tag>
                ) : (
                  <Tag color='red'>
                    {getPositive.calculate === 0 ? '' : <ArrowUpOutlined />} {parseInt(getPositive.calculate)} (
                    {getPositive.percent || 0})
                  </Tag>
                )}
              </div>

              <label>
                <Text style={{ fontSize: 12, color: 'blue' }}>
                  <Trans>pages.home.chart.covid_rep.per_100k</Trans>: 1: 87.2
                </Text>
              </label>
              <br />
              <NewCaseChart data={getPositive.chartData} />
            </Spin>
          </Card>
        </Col>

        <Col xs={24} md={6}>
          <Card bodyStyle={{ padding: '0' }} style={{ padding: 10 }}>
            <label>
              <Text type='secondary' style={{ fontSize: 12 }}>
                <Trans>pages.home.chart.covid_rep.death</Trans>
              </Text>
            </label>
            <br></br>
            <label>
              <Text strong style={{ fontSize: 14 }}>
                <Trans>pages.home.chart.covid_rep.deaths_by_date</Trans>
              </Text>
            </label>
            <br></br>
            <label>
              <Text type='secondary' style={{ fontSize: 12 }}>
                {date}
              </Text>
            </label>

            <div style={{ height: 10 }}></div>

            <label>
              <Text type='secondary' style={{ fontSize: 12 }}>
                <Trans>pages.home.chart.covid_rep.seven_day_avg</Trans>
              </Text>
            </label>
            <Spin tip='Loading...' spinning={getStateDeath28.covid.isFetching}>
              <div style={{ margin: 'auto' }}>
                <label>
                  <Text strong style={{ fontSize: 14 }}>
                    {parseInt(getDeath28.avg7)}
                  </Text>
                </label>
                &nbsp;
                {getDeath28.calculate <= 0 ? (
                  <Tag color='green'>
                    {getDeath28.calculate === 0 ? '' : <ArrowDownOutlined />} {parseInt(getDeath28.calculate)} (
                    {getDeath28.percent || 0})
                  </Tag>
                ) : (
                  <Tag color='red'>
                    {getDeath28.calculate === 0 ? '' : <ArrowUpOutlined />} {parseInt(getDeath28.calculate)} (
                    {getDeath28.percent || 0})
                  </Tag>
                )}
              </div>

              <label>
                <Text style={{ fontSize: 12, color: 'blue' }}>
                  <Trans>pages.home.chart.covid_rep.per_100k</Trans>: 1
                </Text>
              </label>
              <br />
              <NewDeathChart />
            </Spin>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card bodyStyle={{ padding: '0' }} style={{ padding: 10 }}>
            <label>
              <Text type='secondary' style={{ fontSize: 12 }}>
                <Trans>pages.home.chart.covid_rep.healthcare</Trans>
              </Text>
            </label>
            <br></br>
            <label>
              <Text strong style={{ fontSize: 14 }}>
                <Trans>pages.home.chart.covid_rep.hospital_admissions</Trans>
              </Text>
            </label>
            <br></br>
            <label>
              <Text type='secondary' style={{ fontSize: 12 }}>
                {date}
              </Text>
            </label>

            <div style={{ height: 10 }}></div>

            <label>
              <Text type='secondary' style={{ fontSize: 12 }}>
                <Trans>pages.home.chart.covid_rep.seven_day_avg</Trans>
              </Text>
            </label>
            <Spin tip='Loading...' spinning={getStateIpd.isFetching}>
              <div style={{ margin: 'auto' }}>
                <label>
                  <Text strong style={{ fontSize: 14 }}>
                    {parseInt(getIpd.avg7)}
                  </Text>
                </label>
                &nbsp;
                {getIpd.calculate <= 0 ? (
                  <Tag color='green'>
                    {getIpd.calculate === 0 ? '' : <ArrowDownOutlined />} {parseInt(getIpd.calculate)} (
                    {getIpd.percent || 0})
                  </Tag>
                ) : (
                  <Tag color='red'>
                    {getIpd.calculate === 0 ? '' : <ArrowUpOutlined />} {parseInt(getIpd.calculate)} (
                    {getIpd.percent || 0})
                  </Tag>
                )}
              </div>

              <label>
                <Text style={{ fontSize: 12, color: 'blue' }}>&nbsp;</Text>
              </label>
              <br />
              <NewIpdChart data={getIpd.chartData} />
            </Spin>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card bodyStyle={{ padding: '0' }} style={{ padding: 10 }}>
            <label>
              <Text type='secondary' style={{ fontSize: 12 }}>
                <Trans>pages.home.chart.covid_rep.testing</Trans>
              </Text>
            </label>
            <br></br>
            <label>
              <Text strong style={{ fontSize: 14 }}>
                <Trans>pages.home.chart.covid_rep.covid_test_conducted</Trans>
              </Text>
            </label>
            <br></br>
            <label>
              <Text type='secondary' style={{ fontSize: 12 }}>
                {date}
              </Text>
            </label>
            <Spin tip='Loading...' spinning={getStateScreening.isFetching}>
              <div style={{ height: 10 }}></div>

              <label>
                <Text type='secondary' style={{ fontSize: 12 }}>
                  <Trans>pages.home.chart.covid_rep.seven_day_avg</Trans>
                </Text>
              </label>
              <div style={{ margin: 'auto' }}>
                <label>
                  <Text strong style={{ fontSize: 14 }}>
                    {parseInt(getScreening.avg7)}
                  </Text>
                </label>
                &nbsp;
                {getScreening.calculate <= 0 ? (
                  <Tag color='green'>
                    {getScreening.calculate === 0 ? '' : <ArrowDownOutlined />} {parseInt(getScreening.calculate)} (
                    {getScreening.percent || 0})
                  </Tag>
                ) : (
                  <Tag color='red'>
                    {getScreening.calculate === 0 ? '' : <ArrowUpOutlined />} {parseInt(getScreening.calculate)} (
                    {getScreening.percent || 0})
                  </Tag>
                )}
              </div>

              <label>
                <Text style={{ fontSize: 12, color: 'blue' }}>&nbsp;</Text>
              </label>
              <br />
              <ScreeningChart data={getScreening.chartData} />
            </Spin>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const selectorApPositive = getApPositive(state);
  const selectorApScreening = getApScreening(state);
  const selectorDeath = getDeath28(state);
  const selectorIpd = getIpd(state);

  return {
    getPositive: selectorApPositive(state),
    getScreening: selectorApScreening(state),
    getDeath28: selectorDeath(state),
    getIpd: selectorIpd(state),

    getStateScreening: state.screening,
    getStateDeath28: state.death,
    getStateIpd: state.ipd,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CovidReport);
