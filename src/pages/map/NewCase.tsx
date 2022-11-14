import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getPopulationAction } from 'src/actions/hospital';
import { getScreeningRequest } from 'src/actions/screening';
import { RootState } from 'src/reducers';
import { Screening } from 'src/types';
import { PopulationRequest } from 'src/types/population';
import NewCaseMap from './component/NewCaseMap';

interface IProps {
  chwpart: string | undefined;
  getPopulation: () => void;
  getCovidPositive: () => void;
  population: PopulationRequest;
  screening: Screening[];
}

interface IState {
  selectChwpart: string | null;
}

class NewCaseWrapper extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectChwpart: props.chwpart || null,
    };
  }

  componentDidMount() {
    const { getPopulation, getCovidPositive } = this.props;

    getPopulation();
    getCovidPositive();
  }

  onChangwatClick = (changwat: string) => {
    this.setState({ selectChwpart: changwat });
  };

  render() {
    const { population, screening } = this.props;

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          <NewCaseMap onChangwatClick={this.onChangwatClick} population={population} screening={screening} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  population: state.population.city,
  screening: state.screening.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getPopulation: () => dispatch(getPopulationAction.request()),
    getCovidPositive: () => dispatch(getScreeningRequest.request()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCaseWrapper);
