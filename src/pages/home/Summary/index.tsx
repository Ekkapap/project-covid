import { Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import SummaryTable from './SummaryTable';
const styles = {
  cardBody: {
    overflow: "auto"
  }
};
class SummaryWrapper extends Component {
  render() {
    return (
      <Card title='Summary' bodyStyle={styles.cardBody}>
        <SummaryTable />
      </Card>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryWrapper);
