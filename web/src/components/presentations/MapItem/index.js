import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import PropTypes from 'prop-types';
import pin from '../../../images/pin.png';
import you from '../../../images/you.png';

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
        {
          this.props.markers.map(marker => {

            let option = {icon: ''};
            if(marker.highlighted){
              option = {icon: you};
            }
            else{
              option = {icon: pin};
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

export default withScriptjs(withGoogleMap(Map))
