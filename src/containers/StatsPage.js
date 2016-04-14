import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';
import AddParticipantForm from '../components/AddParticipantForm';
import Participant from '../components/Participant';

import ReactHighcharts from 'react-highcharts';
import _ from 'lodash';

const buildHighchartsConfig = (scores) => {
  const scoresFor = (name) => {
    return scores[name] || [];
  };

  const computeData = (scores) => {
    let total = 0;
    return scores.map((score) => {
      total += score;
      return total;
    });
  };

  const series = Object.keys(scores)
    .map((name) => ({ name, data: computeData(scoresFor(name)) }))
    .filter((item) => !_.isEmpty(item.data));

  return { series };
};

export class Container extends Component {
  render() {

    const { scores } = this.props.appState;

    const totalFor = (name) => {
      return (scores[name] || []).reduce((total, score) => {
        return total + score;
      }, 0);
    };

    const totalStatistics = Object.keys(scores).map((name) => (
      <div key={name} className="column center aligned">
        <div className="ui statistic">
          <div className="label">
            {name}
          </div>
          <div className="value">
            {totalFor(name)}
          </div>
        </div>
      </div>
    ));

    const highchartsConfig = buildHighchartsConfig(scores);

    const chart = _.isEmpty(highchartsConfig.series)
      ? <p>no scores to compute on...</p>
      : <ReactHighcharts config={highchartsConfig}  />;

    return (
        <div>
          <h4 className="ui horizontal divider header"> <i className="tag icon"></i> Totals </h4>
          <div className="ui equal width grid">
            {totalStatistics}
          </div>
          <h4 className="ui horizontal divider header"> <i className="tag icon"></i> Statistics </h4>
          {chart}
        </div>

    );
  }
}

Container.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    appState: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
