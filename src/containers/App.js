// import React, { PropTypes } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/app';
import DropDown from '../components/DropDown';
import UndoControls from '../components/UndoControls';

const styles = {
  paddingTop: '4em',
  paddingBottom: '6em'
};

export class Container extends Component {

  resetAll() {
    this.props.actions.resetAll();
    hashHistory.replace('/edit');
  }

  resetScores() {
    this.props.actions.resetScores();
    hashHistory.replace('/');
  }

  render() {
    const bottomMenuDisabled = !this.props.appState.participants.length ? 'disabled segment' : '';
    const bottomMenuClass = `ui four item labeled small icon bottom fixed menu ${bottomMenuDisabled}`;
    const bottomMenuStyle = bottomMenuDisabled ? {padding: 0} : {};

    return (
      <div>
        <div className="ui fixed inverted violet large menu">
          <Link className="header item" to="/"><b>Scora</b></Link>

          <DropDown className="item">
              <i className="trash icon"></i>
              <div className="menu">
                <div onClick={() => this.resetScores()} className="item">
                  <i className="gamepad icon"></i>
                  réinitialiser les scores
                </div>
                <div onClick={() => this.resetAll()} className="item">
                  <i className="user red icon"></i>
                  <span style={{color: 'red'}}>supprimer les participants</span>
                </div>
              </div>
            </DropDown>

          <div className="right icon borderless menu">
            <button className="ui white button item" onClick={() => this.props.actions.revertState(-1)}>
              <i className="undo icon"></i>
            </button>
            <button className="ui white button item" onClick={() => this.props.actions.revertState(+1)}>
              <i className="repeat icon"></i>
            </button>
          </div>

        </div>
        <div style={styles} className="ui text container">
          {this.props.children}
        </div>
        <div className={bottomMenuClass} style={bottomMenuStyle}>
          <Link to="/edit" activeClassName="active" className="item">
            <i className="user icon"></i>
            Participants
          </Link>
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
