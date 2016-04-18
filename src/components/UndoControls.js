import React, { PropTypes } from 'react';

const UndoControl = (props) => {
    return (
      <div className="ui center aligned container">
        <div className="ui icon buttons">
          <button className="ui button basic" onClick={() => props.actions.revertState(-1)}>
              <i className="undo icon"></i>
            </button>
          <button className="ui button basic" onClick={() => props.actions.revertState(+1)}>
            <i className="repeat icon"></i>
          </button>
        </div>
      </div>
    );
};

UndoControl.propTypes = {
  actions: PropTypes.object.isRequired
};

export default UndoControl;
