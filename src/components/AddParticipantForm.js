
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import '../styles/about-page.css';

/*eslint-disable react/no-set-state */

export class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: ''};
  }

  nameChanged(event) {
    this.setState({name: event.target.value});
  }

  addParticipant(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.name);
    this.setState({name: ''});
  }

  render() {
    return (
      <form onSubmit={(e) => this.addParticipant(e)}>
        <input
          type="text"
          name="newParticipant"
          value={this.state.name}
          onChange={(e) => this.nameChanged(e)}
        />
      <input type="submit" value="add" />
      </form>
    );
  }
}

Component.propTypes = {
  onSubmit: PropTypes.element.fn
};

export default Component;
