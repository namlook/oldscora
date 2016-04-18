import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';
import AddParticipantForm from '../components/AddParticipantForm';
import EditParticipant from '../components/EditParticipant';

export class EditPage extends Component {
  render() {
    const { participants } = this.props.appState;
    const _participantsEditList = participants.map((name) => (
      <EditParticipant
        key={name}
        onDelete={this.props.actions.deleteParticipant}
        onRename={this.props.actions.renameParticipant}
        onMoveUp={this.props.actions.moveUpParticipant}
        onMoveDown={this.props.actions.moveDownParticipant}
        name={name}
      />
    ));

    const participantsEditList = participants.length
      ? (<div className="ui piled segments"> {_participantsEditList} </div>)
      : null;

    const styles = {
      marginTop: '1em'
    };

    const hintLabel = participants.length ? null : (
      <div style={{width: '200px'}} className="ui pointing large teal basic label">
        <i className="info icon"></i>Commencez par ajouter quelques joueurs...
      </div>
    );

    return (
      <div>
        <div style={styles} className="ui two columns grid">
          <div className="column">
            <AddParticipantForm onSubmit={this.props.actions.addParticipant} />
            {hintLabel}
          </div>
          <div className= "right aligned column">
            <Link className="ui violet button" to="/">done</Link>
          </div>
        </div>
        {participantsEditList}
      </div>
    );
  }
}

EditPage.propTypes = {
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
)(EditPage);
