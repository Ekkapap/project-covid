import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/reducers';
import { Table } from 'antd';

class SummaryTable extends Component {
  render() {
    const dataSource = [
      {
        key: '1',
        name: 'นครพนม',
        deaths: 10,
        per1m: 1,
        trend: -40,
        hospital_admission: 450,
        hbu: 71,
        hbu_trend: 39,
        case: 345,
        per10k: 6,
        positive_rate: 3.7,
        positive_rage_trend: 37,
      },
      {
        key: '2',
        name: 'สกลนคร',
        deaths: 10,
        per1m: 1,
        trend: -40,
        hospital_admission: 450,
        hbu: 71,
        hbu_trend: 39,
        case: 345,
        per10k: 6,
        positive_rate: 3.7,
        positive_rage_trend: 37,
      },
      {
        key: '3',
        name: 'อุดรธานี',
        deaths: 10,
        per1m: 1,
        trend: -40,
        hospital_admission: 450,
        hbu: 71,
        hbu_trend: 39,
        case: 345,
        per10k: 6,
        positive_rate: 3.7,
        positive_rage_trend: 37,
      },
    ];

    const columns = [
      {
        // title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // width: 100,
      },
      {
        title: 'Deaths',
        dataIndex: 'deaths',
        key: 'deaths',
        width: 140,
      },
      {
        title: 'Per 1M',
        dataIndex: 'per1m',
        key: 'per1m',
        width: 140,
      },
      {
        title: 'Trend',
        dataIndex: 'trend',
        key: 'trend',
        width: 140,
        render: (text: string) => {
          return Number(text) > 0 ? (
            <span style={{ color: 'red' }}>+{text}%</span>
          ) : (
            <span style={{ color: 'green' }}>{text}%</span>
          );
        },
      },
      {
        title: 'Hospital Admissions',
        dataIndex: 'hospital_admission',
        key: 'hospital_admission',
        width: 140,
      },
      {
        title: 'Hospital Bed Utilisation',
        dataIndex: 'hbu',
        key: 'hbu',
        width: 140,
      },
      {
        title: 'Trend',
        dataIndex: 'hbu_trend',
        key: 'hbu_trend',
        width: 140,
        render: (text: string) => {
          return Number(text) > 0 ? (
            <span style={{ color: 'red' }}>+{text}%</span>
          ) : (
            <span style={{ color: 'green' }}>{text}%</span>
          );
        },
      },
      {
        title: 'Case',
        dataIndex: 'case',
        key: 'case',
        width: 140,
      },
      {
        title: 'Per 10K',
        dataIndex: 'per10k',
        key: 'per10k',
        width: 140,
      },
      {
        title: 'Positive Rate',
        dataIndex: 'positive_rate',
        key: 'positive_rate',
        width: 140,
      },
      {
        title: 'Trend',
        dataIndex: 'positive_rage_trend',
        key: 'positive_rage_trend',
        width: 140,
        render: (text: string) => {
          return Number(text) > 0 ? (
            <span style={{ color: 'red' }}>+{text}%</span>
          ) : (
            <span style={{ color: 'green' }}>{text}%</span>
          );
        },
      },
    ];

    return (
      <div>
        <Table size='small' bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryTable);
