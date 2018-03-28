import React, { Component } from 'react'
import { Map, SearchBox } from '../../presentations'
import {bindActionCreators} from "redux"
import {connect} from 'react-redux'
import * as foursquareActions from '../../../actions/foursquare'

class Googlemap extends Component {

  componentDidMount() {
    this.loadRecommendedVenues();
  }

  onPlacesChanged = (data) => {
    const places = data.getPlaces();
    places.map(({ place_id, formatted_address, geometry: { location } }) =>
      this.props.actions.setMapCenter({
        lat: location.lat(), lng: location.lng()
      })
    )

    this.loadRecommendedVenues()
  }

  loadRecommendedVenues = () => {
    let { google } = this.props
    if(google.center){
      let ll = [google.center.lat,google.center.lng].join(',')
      this.props.actions.fetchData('venues/explore?',{
        'll': ll
      })
      // this.props.forecast.fetchData('locations/v1/cities/geoposition/search?',{
      //   'q': ll
      // })
    }
  }

  onCenterChanged = (data) => {
    const center = data.getCenter();
    this.props.actions.setMapCenter({
      lat: center.lat(), lng: center.lng()
    })
  }

  onMarkerClick = (data) => {
    this.props.actions.toggleMarker(data);
  }

  render() {

    let { google } = this.props

    const markers = [];
    if(google.markers && google.markers.length >= 1){
      google.markers.forEach(data => {
        if(data.venue){
          markers.push({
            highlighted: data.highlighted,
            id: data.venue.id,
            location: {
              lat: data.venue.location.lat, 
              lng: data.venue.location.lng 
            }
          })
        }
        else{
          markers.push({
            highlighted: data.highlighted,
            id: data.id,
            location: {
              lat: data.location.lat, 
              lng: data.location.lng 
            }
          })
        }
      })
    }

    let googleMapAPI = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAV6exvDcBNUhdAonHKE5Ty5Ny83f1UZ3o&libraries=geometry,drawing,places'
    return (
      <div>
        <SearchBox 
          googleMapURL={googleMapAPI}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          onPlacesChanged={this.onPlacesChanged}
        />
        <br />
        <Map 
          markers={markers}
          center={google.center}
          zoom={13}
          googleMapURL={googleMapAPI}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMarkerClick={this.onMarkerClick}
          onCenterChanged={this.onCenterChanged}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({  
  foursquare: state.foursquare,
  google: state.google
});

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(foursquareActions, dispatch)
  };
}

const GooglemapContainer = connect(  
  mapStateToProps,
  mapDispatchToProps
)(Googlemap);

export default GooglemapContainer