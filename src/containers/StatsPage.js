import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';
import AddParticipantForm from '../components/AddParticipantForm';
import Participant from '../components/Participant';
import UndoControls from '../components/UndoControls';

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

  return {
    title: { text: '' },
    plotOptions: {
      series: {
        animation: false
      }
    },
    series
  };
};

export class Container extends Component {
  render() {

    const { scores, participants } = this.props.appState;

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

    const body = !participants.length
      ? (
        <div className="ui info message">
          <div className="header">
            {"No scores found"}
          </div>
          <p>{'start the game and'} <Link to="/scores"> {'add some scores first'} </Link></p>
        </div>
      )
      : (
        <div>
          <h2 className="ui horizontal divider header"> <i className="trophy icon"></i> Totals </h2>
          <div className="ui equal width grid">
            {totalStatistics}
          </div>
          <div style={{marginTop: '3em'}}>
          <h2 className="ui horizontal divider header"> <i className="line chart icon"></i> Statistics </h2>
          {chart}
          </div>
        </div>
    );

    return (
      <div>
        <UndoControls actions={this.props.actions} />
        {body}
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
