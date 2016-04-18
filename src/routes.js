import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import ScorePage from './containers/ScorePage';
import EditPage from './containers/EditPage';
import WallOfFame from './containers/WallOfFame.js';
import StatsPage from './containers/StatsPage.js';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route component={App}>
    <Route path="/" component={ScorePage} />
    <Route path="edit" component={EditPage}/>
    <Route path="total" component={WallOfFame}/>
    <Route path="stats" component={StatsPage}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
