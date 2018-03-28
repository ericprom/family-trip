import axios from 'axios';
import moment from 'moment';

import * as types from './mutation-types'

const fourSquare = {
  baseUrl: 'https://api.foursquare.com/v2/',
  clientId: 'J4EKPOE2HI1N5NDO5ZPDV4HXH1FFKZDWEOOLNA1MTJDUD2FE',
  clientSecret: 'PJOQIQLFJTPVP3IHN4HGRPK2RSFAHOHBRJTJ4PJEOYX4T5PV'
}

export let startSearch = () => {
    return {
        type : types.START_VENUE_SEARCH
    }
}

export let endSearch = (payload) => {
    return {
        type : types.END_VENUE_SEARCH,
        payload: payload
    }
}

export let addMapMarkers = (payload) => {
    return {
        type : types.ADD_MAP_MARKER,
        payload: payload
    }
}

export let encodeQueryData = (data) =>{
  let ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

export let fetchData = (path, queryObj = {}) => {
  var query = Object.assign({ 
    'client_id': fourSquare.clientId, 
    'client_secret': fourSquare.clientSecret, 
    'locale': 'th', 
    'v': moment().format('YYYYMMDD') }, queryObj)
  let url = fourSquare.baseUrl + path + encodeQueryData(query)
  return (dispatch) => {
    dispatch(startSearch())
    return axios.get(url).then(
      (response) => {

        if(response.data.response.groups){
          let venues = [];
          let groups = response.data.response.groups;
          groups.forEach(group =>{
            if(group.items){
              let items = group.items;
              items.forEach(item =>{
                if(item.venue){
                  venues.push(item.venue);
                }
              });
            }
          });
          dispatch(endSearch(venues));
          dispatch(addMapMarkers(venues));
        }

        if(response.data.response.categories){
          dispatch(endSearch(response.data.response.categories));
        }
        if(response.data.response.venues){
          dispatch(endSearch(response.data.response.venues));
          dispatch(addMapMarkers(response.data.response.venues));
        }
      },
      (err) => {
        console.log(err);
      }
    )

  }
}

export let loadMore = (data) => {
  return (dispatch) => {
    dispatch(startSearch())
    if(data.categories && data.categories.length > 0){
      dispatch(endSearch(data.categories));
    }
  }
}

export let setMapCenter = (payload) => {
 return (dispatch) => {
  return dispatch({
    type : types.SET_MAP_CENTER,
    payload: payload
  });
 }
}

export let toggleVenue = (payload) => {
 return (dispatch) => {
  return dispatch({
    type : types.SELECTED_MARKER,
    payload: payload
  });
 }
}

export let hideViewButton = (payload) => {
 return (dispatch) => {
  return dispatch({
    type : types.DISABLE_MARKER_CLICK,
    payload: payload
  });
 }
}

export let toggleMarker = (payload) => {
 return (dispatch) => {
  return dispatch({
    type : types.SELECTED_VENUE,
    payload: payload
  });
 }
}