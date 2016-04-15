
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

/*eslint-disable react/no-set-state */

export class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = { confirmState: false, timer: null };
  }

  clicked() {
    if (this.state.confirmState) {
      clearTimeout(this.state.timer);
      this.setState({ confirmState: false, timer: null });
      this.props.onConfirm();
    } else {
      const timer = setTimeout(() => {
        this.setState({ timer: null, confirmState: false });
      }, 1500);
      this.setState({ confirmState: true, timer });
    }
  }

  render() {
    const className = `${this.props.className} ui basic button`;
    const { props } = this;
    return (
      <button className={className} onClick={(e) => this.clicked()}>
        {this.state.confirmState ? props.confirmLabel : props.displayLabel}
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
