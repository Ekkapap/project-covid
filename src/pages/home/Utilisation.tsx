/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Statistic, Progress } from 'antd';
import { RootState } from 'src/reducers';
class Utilisation extends Component {
  render() {
    return (
      <Card title='Utilisation' style={{ height: '100%' }}>
        <Row>
          <Col span={12}>
            <Statistic
              title='Ventilators'
              suffix='%'
              value={34.5}
              valueStyle={{ fontWeight: 'bold' }}
              formatter={(x) => (
                <>
                  <Progress
                    type='circle'
                    percent={34.5}
                    width={36}
                    trailColor='#ddd'
                    strokeWidth={16}
                    showInfo={false}
                  />
                  <span style={{ paddingLeft: 8 }}>{x}</span>
                </>
              )}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='ICUs'
              suffix='%'
              value={55.3}
              valueStyle={{ fontWeight: 'bold' }}
              formatter={(x) => (
                <>
                  <Progress
                    type='circle'
                    percent={55.3}
                    width={36}
                    trailColor='#ddd'
                    strokeWidth={16}
                    showInfo={false}
                  />
                  <span style={{ paddingLeft: 8 }}>{x}</span>
                </>
              )}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Hospital Beds'
              suffix='%'
              value={68.8}
              valueStyle={{ fontWeight: 'bold' }}
              formatter={(x) => (
                <>
                  <Progress
                    type='circle'
                    percent={68.8}
                    width={36}
                    trailColor='#ddd'
                    // success={{ percent: 12, strokeColor: 'green' }}
                    strokeWidth={16}
                    showInfo={false}
                  />
                  <span style={{ paddingLeft: 8 }}>{x}</span>
                </>
              )}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Other'
              suffix='%'
              value={2.5}
              valueStyle={{ fontWeight: 'bold' }}
              formatter={(x) => (
                <>
                  <Progress
                    type='circle'
                    percent={2.5}
                    width={36}
                    trailColor='#ddd'
                    strokeWidth={16}
                    showInfo={false}
                  />
                  <span style={{ paddingLeft: 8 }}>{x}</span>
                </>
              )}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Utilisation);
