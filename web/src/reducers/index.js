import { combineReducers } from 'redux'
import { foursquare } from './foursquare'
import { google } from './google'
import { weather } from './weather'

const rootReducer = combineReducers({
  foursquare,
  google,
  weather
});

export default rootReducer