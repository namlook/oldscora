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
        <IndexLink className="item" activeClassName="active" to="/">scores</IndexLink>
        <Link className="item" activeClassName="active" to="/edit">edit</Link>
        <Link className="item" activeClassName="active" to="/stats">stats</Link>
      </div>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
