import { Card, Col, Row, Typography } from 'antd';
import React, { Component } from 'react';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { getCheckData } from 'src/reducers/selectors/checkData';

interface IProps {
  dataReport: any;
}

const { Text } = Typography;

class checkData extends Component<IProps> {
  render() {
    const { dataReport } = this.props;

    return (
      <div style={{ padding: '20px', background: '#ececec' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              <Trans>ตรวจสอบข้อมูล</Trans>
            </div>
          </Col>
          {dataReport.map((x: any) => {
            return (
              <Col xs={24} md={12} lg={8} xl={6} key={x.type}>
                <Card title={x.type} bordered={true} style={{ width: '100%' }} type='inner'>
                  <Col>
                    <Text strong>Data Record: </Text>
                    <Text strong type='danger'>
                      {x.record}
                    </Text>
                  </Col>
                  <Col>
                    <Text strong>Date last: </Text>
                    <Text strong type='danger'>
                      {x.date_last}
                    </Text>
                  </Col>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const getData = getCheckData(state);
  return {
    dataReport: getData(state),
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(checkData);
