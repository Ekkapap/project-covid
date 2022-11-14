/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Row, Typography, Button, Spin } from 'antd';
import dayjs from 'dayjs';
import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import 'dayjs/locale/th';
import 'src/pages/style.less';
import { RootState } from 'src/reducers';
import i18n from 'src/i18n';
import moment from 'moment';
const { Text } = Typography;

interface IProps {
  data: any;
  getStateVaccine: any;
}

class VaccineReport extends Component<IProps> {
  render() {
    const { data, getStateVaccine } = this.props;
    const date = i18n.t('pages.home.chart.vac_rep.data_as', { date: moment().toDate() });
    return (
      <Row style={{ backgroundColor: 'white', border: '1px solid #f0f0f0' }}>
        <Col xs={24} md={6} style={{ padding: 10 }}>
          <Row>
            <Col xs={24} md={24}>
              <label>
                <Text type='secondary' style={{ fontSize: 12 }}>
                  <Trans>pages.home.chart.vac_rep.vaccinations</Trans>
                </Text>
              </label>
            </Col>
          </Row>
          <Row>
            <Col xs={24} md={24}>
              <label>
                <Text strong style={{ fontSize: 14 }}>
                  <Trans>pages.home.chart.vac_rep.population_vaccinated</Trans>
                </Text>
              </label>
            </Col>
          </Row>
          <Row>
            <Col xs={24} md={24}>
              <label>
                <Text type='secondary' style={{ fontSize: 12 }}>
                  {date}
                </Text>
              </label>
            </Col>
          </Row>
          <Row>
            <Col xs={24} md={24}>
              <label>
                <Button type='link' href="/vaccinations" style={{ fontSize: 14, padding: 0 }}>
                  <Trans>pages.home.chart.vac_rep.all_vaccinated</Trans>
                </Button>
              </label>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={18}>
          <Spin tip='Loading...' spinning={getStateVaccine.isFetching}>
            <Row>
              <Col xs={24} md={8} style={{ padding: 10 }}>
                <Row>
                  <Col xs={14} md={24}>
                    <label>
                      <Text type='secondary' style={{ fontSize: 12 }}>
                        <Trans>pages.home.chart.vac_rep.seven_day_ago</Trans> - <Trans>pages.home.chart.vac_rep.first_dose</Trans>
                      </Text>
                    </label>
                  </Col>
                  <Col xs={10} md={24}>
                    <span className='number-link'>
                      <Text strong>{data.seven_day.dose1.toLocaleString()}</Text>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={14} md={24}>
                    <label>
                      <Text type='secondary' style={{ fontSize: 12 }}>
                        <Trans>pages.home.chart.vac_rep.total_first_dose</Trans>
                      </Text>
                    </label>
                  </Col>
                  <Col xs={10} md={24}>
                    <span className='number-link'>
                      <Text strong>{data.total_vaccine.dose1.toLocaleString()}</Text>
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={8} style={{ padding: 10 }}>
                <Row>
                  <Col xs={14} md={24}>
                    <label>
                      <Text type='secondary' style={{ fontSize: 12 }}>
                        <Trans>pages.home.chart.vac_rep.seven_day_ago</Trans> - <Trans>pages.home.chart.vac_rep.second_dose</Trans>
                      </Text>
                    </label>
                  </Col>
                  <Col xs={10} md={24}>
                    <span className='number-link'>
                      <Text strong>{data.seven_day.dose2.toLocaleString()}</Text>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={14} md={24}>
                    <label>
                      <Text type='secondary' style={{ fontSize: 12 }}>
                        <Trans>pages.home.chart.vac_rep.total_second_dose</Trans>
                      </Text>
                    </label>
                  </Col>
                  <Col xs={10} md={24}>
                    <span className='number-link'>
                      <Text strong>{data.total_vaccine.dose2.toLocaleString()}</Text>
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} md={8} style={{ padding: 10 }}>
                <Row>
                  <Col xs={14} md={24}>
                    <label>
                      <Text type='secondary' style={{ fontSize: 12 }}>
                        <Trans>pages.home.chart.vac_rep.seven_day_ago</Trans> - <Trans>pages.home.chart.vac_rep.booster_dose</Trans>
                      </Text>
                    </label>
                  </Col>
                  <Col xs={10} md={24}>
                    <span className='number-link'>
                      <Text strong>{data.seven_day.booster.toLocaleString()}</Text>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col xs={14} md={24}>
                    <label>
                      <Text type='secondary' style={{ fontSize: 12 }}>
                        <Trans>pages.home.chart.vac_rep.total_booster_dose</Trans>
                      </Text>
                    </label>
                  </Col>
                  <Col xs={10} md={24}>
                    <span className='number-link'>
                      <Text strong>{data.total_vaccine.booster.toLocaleString()}</Text>
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Spin>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    getStateVaccine: state.vaccine,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VaccineReport);
