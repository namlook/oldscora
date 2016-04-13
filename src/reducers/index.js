import { combineReducers } from 'redux';
// import fuelSavingsAppState from './fuelSavings';
import scores from './scores';

const rootReducer = combineReducers({
  app: scores
});

export default rootReducer;
