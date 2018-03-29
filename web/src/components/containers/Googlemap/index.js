import React, { Component } from 'react'
import { Map } from '../../presentations'
import {bindActionCreators} from "redux"
import {connect} from 'react-redux'
import * as foursquareActions from '../../../actions/foursquare'

class Googlemap extends Component {

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
      <Map 
        markers={markers}
        center={google.center}
        zoom={15}
        googleMapURL={googleMapAPI}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{height: (window.innerHeight-50) + 'px'}} />}
        mapElement={<div style={{ height: `100%` }} />}
        onMarkerClick={this.onMarkerClick}
        onCenterChanged={this.onCenterChanged}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({  
  google: state.google
});

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(foursquareActions, dispatch),
  };
}

const GooglemapContainer = connect(  
  mapStateToProps,
  mapDispatchToProps
)(Googlemap);

export default GooglemapContainer