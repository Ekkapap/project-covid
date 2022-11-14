import { Col, Row, Statistic, Card } from 'antd';
import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import _ from 'lodash';
import { RiCheckboxBlankFill } from 'react-icons/ri';
// import TestMap from '../test/TestMap';
import NewCaseMap from './NewCase';

import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { Screening } from 'src/types';
import './index.css';
import dayjs from 'dayjs';

interface IProps {
  screening: Screening[];
}

class MapWrapper extends Component<IProps> {
  render() {
    const { screening } = this.props;

    const total_p = _.sumBy(screening, 'total_p');
    const total_p_7d = _.sumBy(
      screening.filter((x) => x.date && x.date > dayjs().subtract(7, 'day').format('YYYY-MM-DD')),
      'total_p',
    );

    return (
      <div id='map'>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={24}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              <Trans>ระดับความรุนแรงในแต่ละพื้นที่</Trans>
            </div>
          </Col>
          <Col xs={24} md={24}>
            <Card style={{ zIndex: 1 }}>
              <Row gutter={[12, 12]}>
                <Col xs={24} md={24} style={{ fontWeight: 'bold', fontSize: '1em' }}>
                  <Trans>จำนวนผู้ติดโควิดรายใหม่</Trans>
                </Col>
                <Col xs={24} md={24}>
                  <NewCaseMap chwpart={undefined} />
                </Col>
                <Col xs={24} md={24}>
                  <Row gutter={[12, 12]} style={{ marginBottom: '1.5rem' }}>
                    <Col xs={24} md={24}>
                      <RiCheckboxBlankFill color='green' />
                      <span style={{ fontSize: 14, marginRight: '10px' }}> ระดับต่ำ</span>
                      <RiCheckboxBlankFill color='yellow' />
                      <span style={{ fontSize: 14, marginRight: '10px' }}> ระดับกลาง</span>
                      <RiCheckboxBlankFill color='orange' />
                      <span style={{ fontSize: 14, marginRight: '10px' }}> ระดับสูง</span>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: '1.5rem' }}>
                    <Col xs={24} md={24} style={{ fontWeight: 'bold', marginBottom: '.5rem', fontSize: '0.8em' }}>
                      การคัดกรองเชื้อไวรัส
                    </Col>
                    <Col xs={12} md={12}>
                      <Statistic
                        title={<span style={{ fontSize: 12 }}>ย้อนหลัง 7 วัน</span>}
                        value={total_p_7d}
                        valueStyle={{ fontWeight: 'bold', fontSize: 14 }}
                      />
                    </Col>
                    <Col xs={12} md={12}>
                      <Statistic
                        title={<span style={{ fontSize: 12 }}>ทั้งหมด</span>}
                        value={total_p}
                        valueStyle={{ fontWeight: 'bold', fontSize: 14 }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} md={24}>
                      <table className='table-covid-map-desc'>
                        <thead>
                          <tr>
                            <td></td>
                            <td>%ของแต่ละเขต</td>
                            <td>%ของประชากร</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className='green' style={{ color: 'white' }}>
                            <td>ระดับต่ำ</td>
                            <td>&lt;10.0%</td>
                            <td>&lt;15.0%</td>
                          </tr>
                          <tr className='yellow'>
                            <td>ระดับปานกลาง</td>
                            <td>10.1-19.9%</td>
                            <td>15.1-29.9%</td>
                          </tr>
                          <tr className='orange'>
                            <td>ระดับต่ำสูง</td>
                            <td>&gt;20.0%</td>
                            <td>&gt;30%</td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            {/* <Card style={{ zIndex: 1 }}>
              <Row gutter={[12, 12]}>
                <Col xs={24} md={24} style={{ fontWeight: 'bold', fontSize: '1em' }}>
                  <Trans>ระดับความรุนแรงในแต่ละพื้นที่</Trans>
                </Col>
                <Col xs={24} md={24}>
                  <NewCaseMap chwpart={undefined} />
                </Col>
                <Col xs={24} md={24}>
                  <Row gutter={[12, 12]} style={{ marginBottom: '1.5rem' }}>
                    <Col xs={24} md={24}>
                      <RiCheckboxBlankFill color='green' />
                      <span style={{ fontSize: 14, marginRight: '10px' }}> ระดับต่ำ</span>
                      <RiCheckboxBlankFill color='yellow' />
                      <span style={{ fontSize: 14, marginRight: '10px' }}> ระดับกลาง</span>
                      <RiCheckboxBlankFill color='orange' />
                      <span style={{ fontSize: 14, marginRight: '10px' }}> ระดับสูง</span>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: '1.5rem' }}>
                    <Col xs={24} md={24} style={{ fontWeight: 'bold', marginBottom: '.5rem', fontSize: '0.8em' }}>
                      การคัดกรองเชื้อไวรัส
                    </Col>
                    <Col xs={12} md={12}>
                      <Statistic
                        title={<span style={{ fontSize: 12 }}>ย้อนหลัง 7 วัน</span>}
                        value={643}
                        valueStyle={{ fontWeight: 'bold', fontSize: 14 }}
                      />
                    </Col>
                    <Col xs={12} md={12}>
                      <Statistic
                        title={<span style={{ fontSize: 12 }}>ทั้งหมด</span>}
                        value={'535,403'}
                        valueStyle={{ fontWeight: 'bold', fontSize: 14 }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={24} md={24}>
                      <table className='table-covid-map-desc'>
                        <thead>
                          <tr>
                            <td></td>
                            <td>%ของแต่ละเขต</td>
                            <td>%ของประชากร</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className='green' style={{ color: 'white' }}>
                            <td>ระดับต่ำ</td>
                            <td>&lt;10.0%</td>
                            <td>&lt;15.0%</td>
                          </tr>
                          <tr className='yellow'>
                            <td>ระดับปานกลาง</td>
                            <td>10.1-19.9%</td>
                            <td>15.1-29.9%</td>
                          </tr>
                          <tr className='orange'>
                            <td>ระดับต่ำสูง</td>
                            <td>&gt;20.0%</td>
                            <td>&gt;30%</td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card> */}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  screening: state.screening.data,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MapWrapper);
