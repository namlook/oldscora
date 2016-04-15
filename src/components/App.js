import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const styles = {
  marginTop: '4em'
};

const App = (props) => {
  return (
    <div>
      <div className="ui fixed inverted violet large pointing menu">
        <div className="header item" to="/"><b>Scorebut</b></div>
        <Link className="item" activeClassName="active" to="/scores">scores</Link>
        <Link className="item" activeClassName="active" to="/stats">stats</Link>
        <div className="right menu">
          <IndexLink className="item" activeClassName="active" to="/">edit</IndexLink>
        </div>
      </div>
      <div style={styles} className="ui text container">
        {props.children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
