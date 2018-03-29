import axios from 'axios';
import moment from 'moment';

import * as types from './mutation-types'

const fourSquare = {
  baseUrl: 'https://api.foursquare.com/v2/',
  //clientId: 'J4EKPOE2HI1N5NDO5ZPDV4HXH1FFKZDWEOOLNA1MTJDUD2FE',
  //clientSecret: 'PJOQIQLFJTPVP3IHN4HGRPK2RSFAHOHBRJTJ4PJEOYX4T5PV'
  clientId: '4PO4XE4IKRI5ZPLIPSDVUNJS1QPUMFWVEWNROKIXE1WAQZIO',
  clientSecret: 'BV1GZROHFTBU3S2X3TBA1KIL3VACDQ3T0I0OBAL5COJY1RRR'
}


export let startSearch = () => {
    return {
        type : types.START_SEARCH
    }
}

export let endCategorySearch = (payload) => {
    return {
        type : types.END_CATEGORY_SEARCH,
        payload: payload
    }
}
export let endVenueSearch = (payload) => {
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

export let generatePhotoPath = (photos) =>{
  var size = '300x500';
  return photos.map((photo) => {
    return {
      ...photo,
      path: photo.prefix+size+photo.suffix
    }
  })
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

          venues.forEach(venue =>{
            axios.get(fourSquare.baseUrl+'venues/'+venue.id+'/photos?'+encodeQueryData(query)).then((response) => {
              if(response.data.response.photos.count > 0){
                venue['photos'] = this.generatePhotoPath(response.data.response.photos.items)
              }
            })
          })

          dispatch(endVenueSearch(venues));
          dispatch(addMapMarkers(venues));
        }

        if(response.data.response.categories){
          dispatch(endCategorySearch(response.data.response.categories));
        }
        if(response.data.response.venues){
          let venues = response.data.response.venues;
          venues.forEach(venue =>{
            axios.get(fourSquare.baseUrl+'venues/'+venue.id+'/photos?'+encodeQueryData(query)).then((response) => {
              if(response.data.response.photos.count > 0){
                venue['photos'] = this.generatePhotoPath(response.data.response.photos.items)
              }
            })
          })
          dispatch(endVenueSearch(venues));
          dispatch(addMapMarkers(venues));
        }
      },
      (err) => {
        console.log(err);
      }
    )

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

export let toggleMarker = (payload) => {
 return (dispatch) => {
  return dispatch({
    type : types.SELECTED_VENUE,
    payload: payload
  });
 }
}