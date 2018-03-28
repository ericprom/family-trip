import axios from 'axios';

import * as types from './mutation-types'

const weather = {
  baseUrl: 'http://dataservice.accuweather.com/',
  //apiKey: 'S1BrKQvtCrlQ2EIxflcmKZlkemjUAcsS'
  //apiKey: 'T9iRl38QfsjsWlcZAh2ryYGkz7Mai4Rz'
  apiKey: 'VQPKJeAtEIGvnSNyuGsLGAGGqWjqtRx1'
}

export let startSearch = () => {
    return {
        type : types.START_WEATHER_SEARCH
    }
}

export let endSearch = (payload) => {
    return {
        type : types.END_WEATHER_SEARCH,
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
    'apikey': weather.apiKey,
    'language': 'th-th',
    'metric' :true
  }, queryObj)
  let url = weather.baseUrl + path + encodeQueryData(query)
  return (dispatch) => {
    dispatch(startSearch())
    return axios.get(url)
      .then(
        (response) => {
          if(response && response.data && response.data.Key){
            return axios.get(weather.baseUrl+'forecasts/v1/daily/5day/'+response.data.Key+'?'+encodeQueryData(query));
          }
        },
        (err) => {
          dispatch(endSearch([]));
        }
      )
      .then((response) => {
        if(response && response.data && response.data.DailyForecasts){
          dispatch(endSearch(response.data.DailyForecasts));
        }
      });
  }
}