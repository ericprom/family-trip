import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {connect} from 'react-redux';
let actions = require('../../actions/index');

class Map extends Component {

  onCenterChanged = () => {
    const center = this.refs.map.getCenter();
    this.props.setCenterMap({
      lat: center.lat(), lng: center.lng()
    });
  }

  render() {

    return(
      <GoogleMap
        ref='map'
        defaultZoom={this.props.zoom}
        center={this.props.center}
        onCenterChanged={this.onCenterChanged.bind(this)}>
        {
          this.props.markers.map(marker => {
            return <Marker
              key={marker.id}
              position={marker.location}
            />
          })
        }
        
      </GoogleMap>
    );

  }
}

export default connect(
  (state) => {
    return state
  },actions)(withScriptjs(withGoogleMap(Map)))
