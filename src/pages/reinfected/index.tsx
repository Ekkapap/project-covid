/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Dispatch } from 'react';
import { Row, Col, Button, Divider, Statistic } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Trans } from 'react-i18next';
import { RootState } from 'src/reducers';
import Chart from 'src/pages/reinfected/Chart';
import Table from 'src/pages/reinfected/Table';
import './style.less';
import i18n from 'src/i18n';
import moment from 'moment';
import { Screening } from 'src/types';

interface IProps {
  covidcase: Screening[];
}

type TProps = IProps;

class Reinfected extends Component<TProps> {
  render() {
    const { covidcase } = this.props;
    // const groupPatient = _.chain(reinfected.data)
    //   .groupBy('cid')
    //   .toPairs()
    //   .map((item) => {
    //     return _.zipObject(['cid', 'infected'], item);
    //   })
    //   .value();

    // console.log('COUNT RE', groupPatient.filter((x) => x.infected.length > 1).length);

    // วันที่อัพเดทข้อมูลใน moment()
    const updateDate = i18n.t('pages.reinfected.updateValue', { date: moment('2022-10-29').toDate() });
    return (
      <div style={{ paddingBottom: '1rem' }}>
        <Row style={{ margin: '0 0 1rem 0px' }}>
          <Col xs={24} md={24} style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '12px' }}>
            <Trans>pages.reinfected.header</Trans>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={5}>
            <Row gutter={[0, 16]}>
              <Col xs={24} md={24} className='boxL'>
                <p className='boxLT'>
                  <Trans>pages.reinfected.boxL1</Trans>
                </p>
                <p className='boxLN'>--{/* ตัวเลขยอดการติดเชื้่อสะสมครั้งแรก */}</p>
              </Col>
              <Col xs={24} md={24} className='boxL'>
                <p className='boxLT'>
                  <Trans>pages.reinfected.boxL2</Trans>
                </p>
                <p className='boxLN'>--{/* ยอดการติดเชื้อซ้ำสะสม */}</p>
              </Col>
              <Col xs={24} md={24} className='boxL'>
                <p className='boxLT'>
                  <Trans>pages.reinfected.boxL3</Trans>
                </p>
                <p className='boxLN'>
                  {_.sumBy(covidcase, 'total_p')}
                  {/* ยอดสะสมผู้ติดเชื้อ */}
                </p>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={19}>
            <Row style={{ marginBottom: '0.8rem' }}>
              <Col xs={24} md={24}>
                <Chart />
              </Col>
            </Row>
            <Row style={{ marginBottom: '0.8rem' }}>
              <Col xs={24} md={24}>
                <Table />
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={24} style={{ fontStyle: 'italic' }}>
            <Trans>pages.reinfected.note</Trans>
          </Col>
          <Col xs={24} md={24} style={{ fontStyle: 'italic' }}>
            <Button type='primary' className='downloadBtn'>
              <Trans>pages.reinfected.downloadBtn</Trans>
            </Button>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '2rem' }}>
          <Col xs={24} md={7}>
            <Row>
              <Col xs={24} md={24}>
                <Trans>pages.reinfected.update</Trans>
              </Col>
              <Col xs={24} md={24}>
                <Statistic valueStyle={{ color: 'rgb(0 130 217)', fontWeight: 'bold' }} value={updateDate} />
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col xs={12} md={12}>
                <Trans>pages.reinfected.views</Trans>
              </Col>
              <Col xs={12} md={12}>
                <Trans>pages.reinfected.downloadCount</Trans>
              </Col>
              <Col xs={12} md={12}>
                <Statistic valueStyle={{ color: 'rgb(0 130 217)', fontWeight: 'bold' }} value={2440} />
              </Col>
              <Col xs={12} md={12}>
                <Statistic valueStyle={{ color: 'rgb(0 130 217)', fontWeight: 'bold' }} value={480} />
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col xs={24} md={24}>
                <Trans>pages.reinfected.dataBy</Trans>
              </Col>
              <Col xs={24} md={24}>
                <Trans>pages.reinfected.dataByValue</Trans>
              </Col>
            </Row>
            <Row style={{ marginTop: '1rem' }}>
              <Col xs={24} md={24}>
                <Button type='primary' className='downloadBtn'>
                  <Trans>pages.reinfected.dataByContact</Trans>
                </Button>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={17}>
            <Row>
              <Col xs={24} md={24} className='b'>
                <Trans>pages.reinfected.info</Trans>
              </Col>
            </Row>
            <Row className='rowColor'>
              <Col xs={9} md={8}>
                <Trans>pages.reinfected.org</Trans>
              </Col>
              <Col xs={15} md={16}>
                <Trans>pages.reinfected.orgName</Trans>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={24} className='b'>
                <Trans>pages.reinfected.summary</Trans>
              </Col>
            </Row>
            <Row className='rowColor1'>
              <Col xs={9} md={8}>
                <Trans>pages.reinfected.office</Trans>
              </Col>
              <Col xs={15} md={16}>
                <Trans>pages.reinfected.officeName</Trans>
              </Col>
            </Row>
            <Row className='rowColor2'>
              <Col xs={9} md={8}>
                <Trans>pages.reinfected.frequency</Trans>
              </Col>
              <Col xs={15} md={16}>
                <Trans>pages.reinfected.frequencyValue</Trans>
              </Col>
            </Row>
            <Row>
              <Col xs={24} md={24} className='b'>
                <Trans>pages.reinfected.definition</Trans>
              </Col>
            </Row>
            <Row className='rowColor'>
              <Col xs={24} md={8}>
                <Trans>pages.reinfected.about</Trans>
              </Col>
              <Col xs={24} md={16}>
                <Trans>pages.reinfected.aboutText</Trans>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    covidcase: state.screening.data,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Reinfected);
