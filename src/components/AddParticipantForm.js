
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import '../styles/about-page.css';

/*eslint-disable react/no-set-state */

export class AddParticipantForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  nameChanged(event) {
    this.setState({name: event.target.value});
  }

  addParticipant(event) {
    event.preventDefault();
    if (this.state.name) {
      this.props.onSubmit(this.state.name);
      this.setState({name: ''});
    }
  }

  render() {
    return (
          <form className="ui form" onSubmit={(e) => this.addParticipant(e)}>
            <div className="ui mini action input">
              <input
                type="text"
                name="newParticipant"
                spellCheck="false"
                autoCorrect="off"
                value={this.state.name}
                onChange={(e) => this.nameChanged(e)}
              />
              <button className="ui teal button" onClick={(e) => this.addParticipant(e)}>
                add
              </button>
            </div>
          </form>
    );
  }
}

AddParticipantForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default AddParticipantForm;
