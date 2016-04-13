import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import '../styles/about-page.css';

const Component = (props) => {
  const deleteParticipant = (event) => {
    props.onDelete(props.name);
  };

  const renameParticipant = (event) => {
    console.log('rename', props.name, event.target.value);
    props.onRename(props.name, event.target.value);
  };

  return (
    <p>
      <button onClick={deleteParticipant}>-</button>
      <input
        name="participant"
        type="string"
        defaultValue={props.name}
        onBlur={(e) => renameParticipant(e)}
      />
    </p>
  );
};

Component.propTypes = {
  name: PropTypes.element.string,
  onDelete: PropTypes.element.fn,
  onRename: PropTypes.element.fn
};

export default Component;
