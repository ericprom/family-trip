import { combineReducers } from 'redux';
import {foursquare} from './foursquare';
import {google} from './google';

const rootReducer = combineReducers({
  foursquare,
  google
});

export default rootReducer;