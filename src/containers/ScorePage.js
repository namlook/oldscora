import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';
import AddParticipantForm from '../components/AddParticipantForm';
import Participant from '../components/Participant';
import { Link } from 'react-router';


export class Container extends Component {
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

    if (participantsList.length) {
      return (
        <div>
          <h4 className="ui horizontal divider header"> <i className="tag icon"></i> Lap {currentLap} </h4>
          {participantsList}
        </div>
      );
    }
    return (
        <div className="ui info message">
          <div className="header">
            {"You don't have any participants listed"}
          </div>
          <p><Link to="/edit">add some participants first</Link></p>
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
