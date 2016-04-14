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
      <div className="ui stackable grid segment">

        <div className="three wide column middle aligned">
          <div className="ui grid">
            <div className="height wide middle aligned column">
              <h1>{props.name}</h1>
            </div>
            <div className="height wide right aligned column mobile only">
              <div className="ui statistic">
                <div className="label">
                  score
                </div>
                <div className="value">
                  {props.total}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ten wide column middle aligned">
          <div className="ui grid">
            <div className="one column center aligned">
              <div className="ui mini action input">
                <button className="ui red basic button" onClick={(e) => this.addNegativeScore()}>-</button>
                <input
                  name="score"
                  type="number"
                  pattern="[0-9]*" inputmode="numeric"
                  value={this.state.score}
                  onChange={(e) => this.onScoreChanged(e)}
                />
                <button className="ui green basic  button" onClick={(e) => this.addPositiveScore()}>+</button>
              </div>
            </div>
          </div>
        </div>

      {/*
        <div className="ten wide column middle aligned">
        <div className="ui stackable secondary menu">
          <div className="item">
            <button className="fluid ui red basic button" onClick={(e) => this.addNegativeScore()}>-</button>
          </div>
          <div className="item">
            <div className="ui input">
              <input
                name="score"
                type="number"
                pattern="[0-9]*" inputmode="numeric"
                value={this.state.score}
                onChange={(e) => this.onScoreChanged(e)}
              />
            </div>
          </div>
          <div className="item">
            <button className="fluid ui green basic button" onClick={(e) => this.addPositiveScore()}>+</button>
          </div>
        </div>
      </div>
      */}

        {/*}<div className="column middle aligned ">
          <div className="ui form">
            <div className="fields">
              <div className="field">
                <button className="ui red basic button" onClick={(e) => this.addNegativeScore()}>-</button>
              </div>
              <div className="field">
                <input
                  name="score"
                  type="number"
                  pattern="[0-9]*" inputmode="numeric"
                  value={this.state.score}
                  onChange={(e) => this.onScoreChanged(e)}
                />
              </div>
              <div className="field">
                <button className="ui green basic button" onClick={(e) => this.addPositiveScore()}>+</button>
              </div>
            </div>
          </div>
        </div>*/}

        <div className="three wide column right aligned tablet computer only grid">
          <div className="ui statistic">
            <div className="label">
              score
            </div>
            <div className="value">
              {props.currentScore}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Component.propTypes = {
  name: PropTypes.element.string,
  currentScore: PropTypes.element.integer,
  onAddScore: PropTypes.element.fn
};

export default Component;
