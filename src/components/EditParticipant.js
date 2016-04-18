import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import '../styles/about-page.css';

const EditParticipant = (props) => {
  const deleteParticipant = (event) => {
    event.preventDefault();
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
          <button className="ui button" onClick={() => moveUpParticipant()}>^</button>
          <button className="ui button" onClick={() => moveDownParticipant()}>v</button>
        </div>
        <button className="ui red right floated button" onClick={deleteParticipant}>supprimer</button>
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
