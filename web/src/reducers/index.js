import { combineReducers } from 'redux';
import {foursquare} from './foursquare';
import {google} from './google';
import {test} from './test';

const rootReducer = combineReducers({
  foursquare,
  google,
  test
});

export default rootReducer;