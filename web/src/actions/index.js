import axios from 'axios';
import moment from 'moment';

const fourSquare = {
  baseUrl: 'https://api.foursquare.com/v2/',
  clientId: 'J4EKPOE2HI1N5NDO5ZPDV4HXH1FFKZDWEOOLNA1MTJDUD2FE',
  clientSecret: 'PJOQIQLFJTPVP3IHN4HGRPK2RSFAHOHBRJTJ4PJEOYX4T5PV'
}

export let startSearch = () => {
    return {
        type : 'Start_Search'
    }
}

export let endSearch = (payload) => {
    return {
        type : 'End_Search',
        payload: payload
    }
}

export let endGroupSearch = (payload) => {
    return {
        type : 'End_Group_Search',
        payload: payload
    }
}

export let addMapMarkers = (payload) => {
    return {
        type : 'Add_Map_Markers',
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
  let url = fourSquare.baseUrl + path + this.encodeQueryData(query)
  return (dispatch) => {
    dispatch(startSearch())
    return axios.get(url).then(
      (response) => {

        if(response.data.response.groups){
          let groups = response.data.response.groups;
          groups.forEach(group =>{
            if(group.items){
              let items = group.items;
              dispatch(endGroupSearch(items));
              dispatch(addMapMarkers(items));
            }
          });
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

export let disableViewButton = (payload) => {
    return {
        type : 'Disable_View_Button',
        payload: payload
    }
}

export let hideViewButton = (payload) => {
 return (dispatch) => {
  return dispatch(disableViewButton(payload));
 }
}

export let getCenterMap = (payload) => {
    return {
        type : 'Get_Center_Map',
        payload: payload
    }
}

export let setCenterMap = (payload) => {
 return (dispatch) => {
  return dispatch(getCenterMap(payload));
 }

}
export let selectedVenue = (payload) => {
    return {
        type : 'Selected_Venue',
        payload: payload
    }
}

export let toggleVenue = (payload) => {
 return (dispatch) => {
  return dispatch(selectedVenue(payload));
 }
}