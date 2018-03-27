const axios = require('axios');
const moment = require('moment');

const baseUrl = 'https://api.foursquare.com/v2/';
const clientId = 'J4EKPOE2HI1N5NDO5ZPDV4HXH1FFKZDWEOOLNA1MTJDUD2FE';
const clientSecret = 'PJOQIQLFJTPVP3IHN4HGRPK2RSFAHOHBRJTJ4PJEOYX4T5PV';

function encodeQueryData(data) {
   let ret = [];
   for (let d in data)
     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
   return ret.join('&');
}

function getCategories(){
  var data = { 'client_id': clientId, 'client_secret': clientSecret, 'locale': 'th', 'v': moment().format('YYYYMMDD') };
  var querystring = encodeQueryData(data);
  axios.get(baseUrl+'venues/categories?'+querystring)
    .then(response => {
      displayData(response.data.response.categories);
    })
    .catch(error => {
      console.log(error);
    });
}

function getVenues(latlng, categoryId){
  var data = { 
    'client_id': clientId, 
    'client_secret': clientSecret, 
    'locale': 'th', 
    'v': moment().format('YYYYMMDD'),
    'll': latlng,
    'categoryId': categoryId
  };
  var querystring = encodeQueryData(data);
  axios.get(baseUrl+'venues/search?'+querystring)
    .then(response => {
      displayData(response.data.response.venues);
    })
    .catch(error => {
      console.log(error);
    });
}

function getVenuePhotos(venueId){
  var data = { 
    'client_id': clientId, 
    'client_secret': clientSecret, 
    'locale': 'th', 
    'v': moment().format('YYYYMMDD')
  };
  var querystring = encodeQueryData(data);
  axios.get(baseUrl+'venues/'+venueId+'/photos?'+querystring)
    .then(response => {
      generatePhotoPath(response.data.response.photos.items);
    })
    .catch(error => {
      console.log(error);
    });
}

function generatePhotoPath(photos){
  var size = '300x500';
  photos.forEach(function(photo) {
    var image = photo.prefix+size+photo.suffix;
    console.log("path:",image);
  });
}

function displayData(datas){
  datas.forEach(function(data) {
    console.log("/////////////////////////////////////////////");
    console.log("id:",data.id);
    console.log("name:",data.name);
  });
}


//getCategories();
//getVenues('12.7520739,99.7076712', '4d4b7105d754a06377d81259');
getVenuePhotos('4bc57a464a9aa593eb8b067b');