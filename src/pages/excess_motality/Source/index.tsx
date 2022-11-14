import { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { Col, Row, Divider } from 'antd';
import { Trans } from 'react-i18next';

class ExSource extends Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    return <div>
      <Row style={{ marginBottom: '1rem' }}>
        <Col xs={24} md={24} className='text-header'>
          <Trans>pages.excess_mortality.source.header</Trans>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xs={24} md={24}>
          <label className='fs14'><Trans>pages.excess_mortality.source.title</Trans></label>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={3}>
          <label className='fs14'>
            <Trans>pages.excess_mortality.source.s</Trans>
          </label>
        </Col>
        <Col xs={24} md={21}>
          <label className='fs14'>
            <Trans>pages.excess_mortality.source.ss</Trans>
          </label>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={3}>
          <label className='fs14'>
            <Trans>pages.excess_mortality.source.r</Trans>
          </label>
        </Col>
        <Col xs={24} md={21}>
          <label className='fs14'>
            <Trans>pages.excess_mortality.source.rr</Trans>
          </label>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={3}>
          <label className='fs14'>
            <Trans>pages.excess_mortality.source.u</Trans>
          </label>
        </Col>
        <Col xs={24} md={21}>
          <label className='fs14'>
            <Trans>pages.excess_mortality.source.uu</Trans>
          </label>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col xs={24} md={24} style={{ marginTop: '1rem' }}>
          <label className='fs14'>
            <Trans>pages.excess_mortality.source.detail1</Trans>
          </label>
        </Col>
        <Col xs={24} md={24} style={{ marginTop: '1rem' }}>
          <label className='fs14'>
            <Trans>pages.excess_mortality.source.detail2</Trans>
          </label>
        </Col>
      </Row>
    </div>;
  }
}

const mapStateToProps = (state: RootState) => {
  return state;
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExSource);
