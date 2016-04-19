import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ConfirmButton from './ConfirmButton';
// import '../styles/about-page.css';

const EditParticipant = (props) => {
  const deleteParticipant = (event) => {
    props.onDelete(props.name);
  };

  const renameParticipant = (event) => {
    props.onRename(props.name, event.target.value);
  };

  const moveUpParticipant = () => {
    props.onMoveUp(props.name);
  };

  const moveDownParticipant = () => {
    props.onMoveDown(props.name);
  };


  return (
    <div className="ui segment">
      <div className="ui form">
        <div className="field">
          <input
            name="participant"
            type="text"
            defaultValue={props.name}
            onBlur={(e) => renameParticipant(e)}
          />
        </div>
      </div>
      <div className="ui hidden divider"></div>
      <div className="container">
        <div className="ui buttons">
          <button className="ui button" onClick={() => moveUpParticipant()}>
            <i className="ui chevron up icon"></i>
          </button>
          <button className="ui button" onClick={() => moveDownParticipant()}>
            <i className="ui chevron down icon"></i>
          </button>
        </div>
        <ConfirmButton
          className="ui red right floated button"
          displayClassName="basic"
          displayLabel="supprimer"
          confirmLabel="confirmer"
          onConfirm={deleteParticipant} />
      </div>
    </div>
  );

};

EditParticipant.propTypes = {
  name: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRename: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func.isRequired,
  onMoveDown: PropTypes.func.isRequired
};

export default EditParticipant;
