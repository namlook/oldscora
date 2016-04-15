// import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';

const styles = {
  marginTop: '4em'
};

export class Container extends Component {

  render() {
    return (
      <div>
        <div className="ui fixed inverted violet large pointing menu">
          <div className="header item" to="/"><b>Scorebut</b></div>
          <Link className="item" activeClassName="active" to="/">scores</Link>
          <Link className="item" activeClassName="active" to="/stats">stats</Link>

          <div className="right menu">
            <IndexLink className="item" activeClassName="active" to="/edit">
              edit
            </IndexLink>
          </div>
        </div>
        <div style={styles} className="ui text container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.element
// };

// export default App;

Container.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  children: PropTypes.element
};

function mapStateToProps(state) {
  return {
    appState: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
