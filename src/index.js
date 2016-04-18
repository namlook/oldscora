/*eslint-disable import/default*/

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, hashHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>, document.getElementById('app')
);
