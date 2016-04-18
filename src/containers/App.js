// import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';
import UndoControls from '../components/UndoControls';

const styles = {
  marginTop: '4em',
  marginBottom: '10em'
};

export class Container extends Component {

  render() {
    // window.scrollTo(0, 0); // scroll to top each time we change page

    const bottomMenuDisabled = !this.props.appState.participants.length ? 'disabled segment' : '';
    const bottomMenuClass = `ui three item labeled icon bottom fixed menu ${bottomMenuDisabled}`;
    const bottomMenuStyle = bottomMenuDisabled ? {padding: 0} : {};

    return (
      <div>
        <div className="ui fixed inverted violet large menu">
          <Link className="header item" to="/"><b>Scora</b></Link>

          <div className="right icon borderless menu">
            <button className="ui white button item" onClick={() => this.props.actions.revertState(-1)}>
              <i className="undo icon"></i>
            </button>
            <button className="ui white button item" onClick={() => this.props.actions.revertState(+1)}>
              <i className="repeat icon"></i>
            </button>
            <Link to="/edit" activeClassName="active" className="item">
              <i className="edit icon"></i>
            </Link>
          </div>

        </div>
        <div style={styles} className="ui text container">
          {this.props.children}
        </div>
        <div className={bottomMenuClass} style={bottomMenuStyle}>
          <Link to="/" activeClassName="active" className="item">
            <i className="gamepad icon"></i>
            Scores
          </Link>
          <Link to="/total" activeClassName="active" className="item">
            <i className="trophy icon"></i>
            Total
          </Link>
          <Link to="/stats" activeClassName="active" className="item">
            <i className="line chart icon"></i>
            Statistiques
          </Link>
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
