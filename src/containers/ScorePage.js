import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';
import AddParticipantForm from '../components/AddParticipantForm';
import Participant from '../components/Participant';
import { Link, hashHistory } from 'react-router';


export class Container extends Component {
  componentWillMount() {
    if (!this.props.appState.participants.length) {
      hashHistory.replace('/edit');
    }
  }

  render() {

    const { scores, currentScores, participants, currentLap } = this.props.appState;

    const currentScoreFor = (name) => currentScores[name] || '-';
    const totalFor = (name) => {
      return (scores[name] || []).reduce((total, score) => {
        return total + score;
      }, 0);
    };

    const isDisabled = (name) => (scores[name].length - 1 >= currentLap);

    const participantsList = participants.map((name) => (
      <Participant
        key={name}
        name={name}
        currentScore={currentScoreFor(name)}
        totalScore={totalFor(name)}
        onAddScore={this.props.actions.addScore}
        disabled={isDisabled(name)}
      />
    ));




    return (
      <div>
        <h2 className="ui horizontal divider header">
          <i className="history icon"></i>
          Tour {currentLap}
        </h2>
        <div style={{marginTop: 0}} className="ui piled segments">
          {participantsList}
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
