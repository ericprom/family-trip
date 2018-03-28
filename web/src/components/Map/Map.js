import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
let actions = require('../../actions/index');

class Map extends Component {


 static propTypes = {
    onMarkerClick: PropTypes.func,
    onCenterChanged: PropTypes.func,
  };

  render() {

    return(
      <GoogleMap
        ref='map'
        defaultZoom={this.props.zoom}
        center={this.props.center}
        onCenterChanged={() => this.props.onCenterChanged(this.refs.map)}>
        <Marker
          position={this.props.center}
        />
        {
          this.props.markers.map(marker => {

            let option = {icon: '', size:32+'px'};
            if(marker.highlighted){
              option = {icon: 'http://www.themarslab.org/app/uploads/2014/04/pin-smile.png', size:32+'px'};
            }
            return <Marker
              options={option}
              key={marker.id}
              position={marker.location}
              onClick={() => this.props.onMarkerClick(marker)}
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
