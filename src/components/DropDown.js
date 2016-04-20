
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import jQuery from 'jquery';
import semanticTransition from 'semantic-ui-transition';
import semanticDropDown from 'semantic-ui-dropdown';

window.$ = jQuery;
window.$.fn.transition = semanticTransition;
window.$.fn.dropdown = semanticDropDown;

/*eslint-disable react/no-set-state */

export class DropDown extends React.Component {

  componentDidMount() {
    $(this.refs.dropdown).dropdown();
  }

  render() {
    const className = `${this.props.className} ui dropdown`;
    return (
        <div className={className} ref="dropdown">
          {this.props.children}
        </div>
    );
  }
}

DropDown.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default DropDown;
