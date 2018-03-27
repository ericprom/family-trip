const axios = require('axios');
const moment = require('moment');

const baseUrl = 'http://dataservice.accuweather.com';
const apiKey = 'S1BrKQvtCrlQ2EIxflcmKZlkemjUAcsS';

function encodeQueryData(data) {
   let ret = [];
   for (let d in data)
     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
   return ret.join('&');
}

function getLocationKey(latlng){
  var data = { 'apikey': apiKey, 'q': latlng, 'language': 'th-th' };
  var querystring = encodeQueryData(data);
  axios.get(baseUrl+'/locations/v1/cities/geoposition/search?'+querystring)
    .then(response => {
      var locKey = response.data.Key;
      forecasts(locKey);
    })
    .catch(error => {
      console.log(error);
    });
}

function forecasts(locKey){
  var data = { 'apikey': apiKey, 'language': 'th-th', 'metric' :true };
  var querystring = encodeQueryData(data);
  axios.get(baseUrl+'/forecasts/v1/daily/5day/'+locKey+'?'+querystring)
    .then(response => {
      displayData(response.data.DailyForecasts);
    })
    .catch(error => {
      console.log(error);
    });
}

function displayData(datas){
  datas.forEach(function(data) {
    console.log("/////////////////////////////////////////////");
    console.log("วันที่:",moment(data.Date).format('DD/MM/YYYY'));
    console.log("กลางวัน:",data.Day.IconPhrase);
    console.log("กลางคืน:",data.Night.IconPhrase);
    console.log("อุณหภูมิ:",data.Temperature.Minimum.Value+'-'+data.Temperature.Maximum.Value);
  });
}

getLocationKey('12.7520739,99.7076712');
