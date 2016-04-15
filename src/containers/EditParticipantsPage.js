import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';
import AddParticipantForm from '../components/AddParticipantForm';
import EditParticipant from '../components/EditParticipant';

export class Container extends Component {
  render() {
    const _participantsEditList = this.props.appState.participants.map((name) => (
      <EditParticipant
        key={name}
        onDelete={this.props.actions.deleteParticipant}
        onRename={this.props.actions.renameParticipant}
        onMoveUp={this.props.actions.moveUpParticipant}
        onMoveDown={this.props.actions.moveDownParticipant}
        name={name}
      />
    ));

    const participantsEditList = _participantsEditList.length
      ? (<div className="ui piled segments"> {_participantsEditList} </div>)
      : null;

    const styles = {
      marginTop: 40
    };

    return (
      <div>
        <div style={styles} className="ui two columns grid">
          <div className="column">
            <AddParticipantForm onSubmit={this.props.actions.addParticipant} />
          </div>
          <div className= "right aligned column">
            <Link className="ui violet button" to="scores">done</Link>
          </div>
        </div>
        <div className="ui hidden divider"></div>
        <div>
          {participantsEditList}
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
