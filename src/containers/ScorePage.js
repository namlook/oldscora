import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';
import AddParticipantForm from '../components/AddParticipantForm';
import Participant from '../components/Participant';
import { Link } from 'react-router';


export class Container extends Component {
  render() {

    const { scores, participants } = this.props.appState;

    const totalFor = (name) => {
      return (scores[name] || []).reduce((total, score) => {
        return total + score;
      }, 0);
    };

    const participantsList = participants.map((name) => (
      <Participant
        key={name}
        name={name}
        total={totalFor(name)}
        onAddScore={this.props.actions.addScore}
      />
    ));

    return participantsList.length
      ? <div>{participantsList}</div>
      : (
        <div className="ui message">
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
