import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

const App = (props) => {
  const styles = {
    menu: {
      marginTop: 20
    }
  };

  return (
    <div className="ui text container">
      <div style={styles.menu} className="ui pointing menu">
        <div className="header item" to="/"><b>Scorebut</b></div>
        <Link className="item" activeClassName="active" to="/scores">scores</Link>
        <Link className="item" activeClassName="active" to="/stats">stats</Link>
        <div className="right menu">
          <IndexLink className="item" activeClassName="active" to="/">edit</IndexLink>
        </div>
      </div>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
