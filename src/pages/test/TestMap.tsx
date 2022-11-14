/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import ReactLeaflet from './ReactLeaflet';
import { CHWPART } from 'src/constants/changwat';
// import D3Map from './D3Map';

interface IProps {
  chwpart: string | undefined;
}
interface IState {
  selectChwpart: string | null;
}

class Map extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectChwpart: props.chwpart || null,
    };
  }

  onChangwatClick = (changwat: string) => {
    this.setState({ selectChwpart: changwat });
  };
  render() {
    const { selectChwpart } = this.state;
    const chwpart = CHWPART.find((x) => x.chwcode === selectChwpart);
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <ReactLeaflet onChangwatClick={this.onChangwatClick} />
        </div>

        {/* <div style={{ flex: 2 }}>
          <div>{chwpart?.chwname || 'ประเทศไทย'}</div>
          {chwpart && (
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Button variant='contained'>Text 1</Button>
              </Col>
              <Col span={24}>
                <Button variant='contained'>Text 1</Button>
              </Col>
              <Col span={24}>
                <Button variant='contained'>Text 1</Button>
              </Col>
              <Col span={24}>
                <Button variant='contained'>Text 1</Button>
              </Col>
            </Row>
          )}
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
