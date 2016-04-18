import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
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
  componentWillMount() {
    if (!this.props.appState.participants.length) {
      hashHistory.replace('/edit');
    }
  }

  render() {
    window.scrollTo(0, 0); // scroll to top each time we change page

    const { scores, participants } = this.props.appState;

    const highchartsConfig = buildHighchartsConfig(scores);

    const chart = _.isEmpty(highchartsConfig.series)
      ? <p>no scores to compute on...</p>
      : <ReactHighcharts config={highchartsConfig}  />;

    return (
      <div style={{marginTop: '3em'}}>{/*} marginBottom: '10em'}}>*/}
        <h2 className="ui horizontal divider header"> <i className="line chart icon"></i> Statistics </h2>
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
