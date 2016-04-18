import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';
import AddParticipantForm from '../components/AddParticipantForm';
import Participant from '../components/Participant';

import ReactHighcharts from 'react-highcharts';
import _ from 'lodash';


export class Container extends Component {
  componentWillMount() {
    if (!this.props.appState.participants.length) {
      hashHistory.replace('/edit');
    }
  }

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

    return (
      <div>
        <h2 className="ui horizontal divider header"> <i className="trophy icon"></i> Totals </h2>
        <div className="ui two column equal width grid">
          {totalStatistics}
        </div>
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
