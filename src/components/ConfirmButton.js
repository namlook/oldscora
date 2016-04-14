
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

/*eslint-disable react/no-set-state */

export class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = { label: props.displayLabel, confirmState: false };
  }

  clicked() {
    if (!this.state.confirmState) {
      this.setState({ label: this.props.confirmLabel, confirmState: true });
    } else {
      this.setState({ label: this.props.displayLabel, confirmState: false });
      this.props.onConfirm();
    }
  }

  render() {
    const className = `${this.props.className} ui basic button`;
    return (
      <button className={className} onClick={(e) => this.clicked()}>
        {this.state.label}
      </button>
    );
  }
}

Component.propTypes = {
  className: PropTypes.element.string,
  displayLabel: PropTypes.element.string,
  confirmLabel: PropTypes.element.string,
  onConfirm: PropTypes.element.fn
};

export default Component;
