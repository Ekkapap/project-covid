import { Col, Row, Spin } from 'antd';
import React, { PureComponent } from 'react';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { getDataReportDashboard } from 'src/reducers/selectors/screening';

type IProps = {
  reportDashboard: any;
  screencovids: any;
};

class ReportHeader extends PureComponent<IProps> {
  render() {
    const { reportDashboard, screencovids } = this.props;
    return (
      <>
        <Row style={{ marginBottom: '1rem' }}>
          <Col xs={24} md={24}>
            <Row gutter={[8, { xs: 16, md: 8 }]}>
              <Col xs={14} md={6}>
                <Row>
                  <Col className='text-header'>
                    <Trans>pages.screening.chart.screeningReport.title1</Trans>
                  </Col>
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
                    {screencovids.isFetching ? (
                      <Spin size='small' />
                    ) : (
                      <span className='number-link'>
                        {(reportDashboard.screening_sevenday || 0).toLocaleString('en', { useGrouping: true })}
                      </span>
                    )}
                  </Col>
                  <Col xs={12} md={10}>
                    {screencovids.isFetching ? (
                      <Spin size='small' />
                    ) : (
                      <span className='number-link'>
                        {(reportDashboard.screening_all || 0).toLocaleString('en', { useGrouping: true })}
                      </span>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xs={10} md={18} className='text-header'>
                <Row>
                  <Col className='text-header'><Trans>pages.screening.chart.screeningReport.title2</Trans></Col>
                </Row>
                <Row>
                  <Col className='number-link-label'>&nbsp;</Col>
                </Row>
                <Row>
                  <Col>
                    {screencovids.isFetching ? (
                      <Spin size='small' />
                    ) : (
                      <span className='number-link'>
                        {(reportDashboard.screening_rt_pcr || 0).toLocaleString('en', { useGrouping: true })}
                      </span>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const selector = getDataReportDashboard(state);
  return {
    reportDashboard: selector(state),
    screencovids: state.screening,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReportHeader);
