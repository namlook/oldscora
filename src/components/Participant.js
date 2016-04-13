import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// import '../styles/about-page.css';

/*eslint-disable react/no-set-state */

export class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = {score: 0};
  }

  addNegativeScore() {
    this.props.onAddScore(this.props.name, -this.state.score);
    this.setState({ score: 0 });
  }

  addPositiveScore() {
    this.props.onAddScore(this.props.name, this.state.score);
    this.setState({ score: 0 });
  }

  onScoreChanged(event) {
    const score = parseFloat(event.target.value) || 0;
    this.setState({ score });
  }

  render() {
    const props = this.props;
    return (
      <p>
        {props.name}
        <button onClick={(e) => this.addNegativeScore()}>-</button>
        <input
          name="score"
          type="number"
          value={this.state.score}
          onChange={(e) => this.onScoreChanged(e)}
        />
        <button onClick={(e) => this.addPositiveScore()}>+</button>
      </p>
    );
  }
}

Component.propTypes = {
  name: PropTypes.element.string,
  onAddScore: PropTypes.element.fn
};

export default Component;
