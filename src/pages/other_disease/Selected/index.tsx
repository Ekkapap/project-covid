import { Checkbox, Col, Row } from 'antd';
import React, { Component } from 'react';

interface IState {
  i_dengue: boolean;
  i_covid19: boolean;
}

export default class index extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      i_dengue: true,
      i_covid19: true,
    };
  }

  render() {
    const { i_dengue, i_covid19 } = this.state;
    return (
      <Row style={{ marginBottom: '0.8rem' }}>
        <Col xs={24} md={12}>
          <label className='text-header'>รายโรค</label>
          &nbsp;&nbsp;&nbsp;
          <Checkbox checked={i_dengue} onChange={(e) => this.setState({ i_dengue: e.target.checked })}>
            Dengue
          </Checkbox>
          <Checkbox checked={i_covid19} onChange={(e) => this.setState({ i_covid19: e.target.checked })}>
            Covid-19
          </Checkbox>
        </Col>
      </Row>
    );
  }
}
