import { Card, Col, Row, Tag, Typography } from 'antd';
import React, { Component } from 'react';
import { ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

class CovidReport extends Component {
  render() {
    return (
      <Row gutter={[8, 8]}>
        <Col xs={24} md={6}>
          <Card bodyStyle={{ padding: '0' }} style={{ padding: 10 }}>
            <label>
              <Text type='secondary' style={{ fontSize: 14 }}>
                การพบเชื้อ
              </Text>
            </label>
            <br></br>
            <label>
              <Text strong style={{ fontSize: 16 }}>
                การพบผู้ป่วยติดเชื้อโควิด 19
              </Text>
            </label>
            <br></br>
            <label>
              <Text type='secondary' style={{ fontSize: 13 }}>
                ถึงวันที่ 24 พฤษาคม 2565
              </Text>
            </label>

            <div style={{ height: 10 }}></div>

            <label>
              <Text type='secondary' style={{ fontSize: 13 }}>
                ย้อนหลัง 7 วัน
              </Text>
            </label>
            <div style={{ margin: 'auto' }}>
              <label>
                <Text strong style={{ fontSize: 16 }}>
                  58,786
                </Text>
              </label>
              &nbsp;
              <Tag color='green'>
                <ArrowDownOutlined /> -11,682 (-16.6%)
              </Tag>
            </div>

            <label>
              <Text style={{ fontSize: 13, color: 'blue' }}>อัตราต่อ 100,000 คน: 87.2</Text>
            </label>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card bodyStyle={{ padding: '0' }} style={{ padding: 10 }}>
            <label>
              <Text type='secondary' style={{ fontSize: 14 }}>
                ผู้เสียชีวิต
              </Text>
            </label>
            <br></br>
            <label>
              <Text strong style={{ fontSize: 16 }}>
                เสียชีวิตภายใน 28 วันหลังจากพบเชื้อ
              </Text>
            </label>
            <br></br>
            <label>
              <Text type='secondary' style={{ fontSize: 13 }}>
                ถึงวันที่ 24 พฤษาคม 2565
              </Text>
            </label>

            <div style={{ height: 10 }}></div>

            <label>
              <Text type='secondary' style={{ fontSize: 13 }}>
                ย้อนหลัง 7 วัน
              </Text>
            </label>
            <div style={{ margin: 'auto' }}>
              <label>
                <Text strong style={{ fontSize: 16 }}>
                  789
                </Text>
              </label>
              &nbsp;
              <Tag color='green'>
                <ArrowDownOutlined /> -328 (-29.4%)
              </Tag>
            </div>

            <label>
              <Text style={{ fontSize: 13, color: 'blue' }}>อัตราต่อ 100,000 คน: 1</Text>
            </label>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card bodyStyle={{ padding: '0' }} style={{ padding: 10 }}>
            <label>
              <Text type='secondary' style={{ fontSize: 14 }}>
                ผู้ป่วยติดเชื้อ
              </Text>
            </label>
            <br></br>
            <label>
              <Text strong style={{ fontSize: 16 }}>
                ผู้ป่วยที่เข้ารับการรักษา
              </Text>
            </label>
            <br></br>
            <label>
              <Text type='secondary' style={{ fontSize: 13 }}>
                ถึงวันที่ 24 พฤษาคม 2565
              </Text>
            </label>

            <div style={{ height: 10 }}></div>

            <label>
              <Text type='secondary' style={{ fontSize: 13 }}>
                ย้อนหลัง 7 วัน
              </Text>
            </label>
            <div style={{ margin: 'auto' }}>
              <label>
                <Text strong style={{ fontSize: 16 }}>
                  5,072
                </Text>
              </label>
              &nbsp;
              <Tag color='green'>
                <ArrowDownOutlined /> -999 (-16.5%)
              </Tag>
            </div>

            <label>
              <Text style={{ fontSize: 13, color: 'blue' }}>&nbsp;</Text>
            </label>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card bodyStyle={{ padding: '0' }} style={{ padding: 10 }}>
            <label>
              <Text type='secondary' style={{ fontSize: 14 }}>
                การพบเชื้อ
              </Text>
            </label>
            <br></br>
            <label>
              <Text strong style={{ fontSize: 16 }}>
                ผ่านการตรวจเชื้อแล้ว
              </Text>
            </label>
            <br></br>
            <label>
              <Text type='secondary' style={{ fontSize: 13 }}>
                ถึงวันที่ 24 พฤษาคม 2565
              </Text>
            </label>

            <div style={{ height: 10 }}></div>

            <label>
              <Text type='secondary' style={{ fontSize: 13 }}>
                ย้อนหลัง 7 วัน
              </Text>
            </label>
            <div style={{ margin: 'auto' }}>
              <label>
                <Text strong style={{ fontSize: 16 }}>
                  1,566,809
                </Text>
              </label>
              &nbsp;
              <Tag color='default'>
                <ArrowDownOutlined /> -149,282 (-8.7%)
              </Tag>
            </div>

            <label>
              <Text style={{ fontSize: 13, color: 'blue' }}>&nbsp;</Text>
            </label>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default CovidReport;
