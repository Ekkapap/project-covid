import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOtherDiseaseRegion } from 'src/reducers/selectors/otherDisease';
// import { RootState } from 'src/reducers';
import { Table } from 'antd';
import 'src/pages/style.less';
import { RootState } from 'src/reducers';
import { compose } from 'recompose';
import { chwpart } from 'src/constants/thaiaddress';
import i18n from 'src/i18n';
import 'src/pages/screening/ScreeningByArea/index.less';
import _ from 'lodash';

interface IProps {
  dataArea: any;
}
interface EXProps {
  filter?: string;
  types?: string;
  t:any;
}

type TProps = IProps & EXProps;

class ScreeningTable extends Component<TProps> {
  render() {
    const { dataArea, types, t } = this.props;
    const columns = [
      {
        title: i18n.t('pages.other_disease.table.c1'),
        dataIndex: 'chwpart',
        filters: [],
        onFilter: (value: any, record: any) => record.name.startsWith(value),
        filterSearch: true,
        render: (x: any) => chwpart[x],
      },
      {
        title: t('pages.other_disease.table.c2'),
        dataIndex: 'value',
        sorter: (a: any, b: any) => a.age - b.age,
        className: 'fix-right',
      },
      {
        title: t('pages.other_disease.table.c3'),
        dataIndex: 'rate_value',
        sorter: (a: any, b: any) => a.age - b.age,
        className: 'fix-right',
      },
    ];
    return (
      <div>
        <Table
          className='componentcase'
          columns={columns}
          dataSource={_.filter(dataArea, { type: types })}
          size='small'
          bordered={false}
          rowKey='chwpart'
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: TProps) => {
  const selector = getOtherDiseaseRegion(state, ownProps.filter);

  return {
    dataArea: selector(state),
  };
};

const mapDispatchToProps = {};
export default compose<TProps, EXProps>(connect(mapStateToProps, mapDispatchToProps))(ScreeningTable);
