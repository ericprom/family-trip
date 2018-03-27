import { combineReducers } from 'redux';
import {foursquare} from './foursquare';
import {test} from './test';

const rootReducer = combineReducers({
  foursquare,
  test
});

export default rootReducer;