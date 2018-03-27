import React, { Component } from 'react';
import {Col, Grid, ListGroup, Row} from 'react-bootstrap';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import {connect} from 'react-redux';
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");
let actions = require('../../actions/index');

class Map extends Component {

  onCenterChanged = () => {
    const center = this.refs.map.getCenter();
    this.props.setCenterMap({
      lat: center.lat(), lng: center.lng()
    });
  }

  onPlacesChanged = () => {
    const places = this.refs.search.getPlaces();
    places.map(({ place_id, formatted_address, geometry: { location } }) =>
      this.props.setCenterMap({
        lat: location.lat(), lng: location.lng()
      })
    )
  }

  render() {

    let {google} = this.props;
    let searchBox = <StandaloneSearchBox
        ref='search'
        onPlacesChanged={this.onPlacesChanged.bind(this)}>
        <input
          type="text"
          placeholder="ค้นหาสถานที่เที่ยว"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </StandaloneSearchBox>;

    let googleMap = <GoogleMap
        ref='map'
        defaultZoom={15}
        center={google.center}
        onCenterChanged={this.onCenterChanged.bind(this)}>
      </GoogleMap>;

    return(
      <Grid>
        <Row>
          <Col>
            {searchBox}
          </Col>
        </Row>
        <Row>
          <Col>
            {googleMap}
          </Col>
        </Row>
      </Grid>
    );

  }
}

export default connect(
  (state) => {
    return state
  },actions)(withScriptjs(withGoogleMap(Map)))
