import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import '../styles/about-page.css';

const Component = (props) => {
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

  // return (
  //     <div className="item">
  //       <div className="ui vertical buttons">
  //         <button className="ui button">^</button>
  //         <button className="ui button">v</button>
  //       </div>
  //       <div className="content">
  //         <div className="header">
  //         </div>
  //         <div className="description">
  //           <div className="ui input">
  //             <input
  //               name="participant"
  //               type="text"
  //               defaultValue={props.name}
  //               onBlur={(e) => renameParticipant(e)}
  //             />
  //           </div>
  //         </div>
  //         <div className="extra">
  //           <button className="ui red button" onClick={deleteParticipant}>supprimer</button>
  //         </div>
  //       </div>
  //     </div>
  // );


  // return (
  //   <div className="ui two stackable column grid segment">
  //     <div className="column">
  //       <div className="ui mini action input">
  //         <button className="ui button">^</button>
  //         <div className="ui input">
  //           <input
  //             name="participant"
  //             type="text"
  //             defaultValue={props.name}
  //             onBlur={(e) => renameParticipant(e)}
  //           />
  //         </div>
  //         <button className="ui button">v</button>
  //       </div>
  //     </div>
  //     <div className="column">
  //       <button className="ui red button" onClick={deleteParticipant}>supprimer</button>
  //     </div>
  //   </div>
  // );
};

Component.propTypes = {
  name: PropTypes.element.string,
  onDelete: PropTypes.element.fn,
  onRename: PropTypes.element.fn
};

export default Component;
