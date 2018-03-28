import React from 'react';
import Map from '../Map/Map';
import SearchBox from '../Map/SearchBox';
import ListItem from '../ListItem';
import ListGroupItem from '../ListGroupItem';
import {Col, Grid, ListGroup, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
let actions = require('../../actions/index');

class Content extends React.Component {

  componentDidMount() {

    this.loadRecommendedVenues();
    //this.props.fetchData('venues/categories?');
  }

  onViewClick = (data) => {
    let { google } = this.props;

    let ll = [google.center.lat,google.center.lng].join(',')
    this.props.fetchData('venues/search?',{
      'll': ll,
      'categoryId': data.id
    });

    this.props.hideViewButton(true);
  };

  onToggleClick = (data) => {
    if(data.categories && data.categories.length > 0){
      this.props.loadMore(data);
    }
  };

  onPlacesChanged = (data) => {
    const places = data.getPlaces();
    places.map(({ place_id, formatted_address, geometry: { location } }) =>
      this.props.setCenterMap({
        lat: location.lat(), lng: location.lng()
      })
    );

    this.loadRecommendedVenues();
  }

  loadRecommendedVenues = () => {
    let { google } = this.props;
    if(google.center){
      let ll = [google.center.lat,google.center.lng].join(',')
      this.props.fetchData('venues/explore?',{
        'll': ll
      });

      this.props.hideViewButton(true);
    }
  };

  onCenterChanged = (data) => {
    const center = data.getCenter();
    this.props.setCenterMap({
      lat: center.lat(), lng: center.lng()
    });

   // this.loadRecommendedVenues();
  }


  onMarkerClick = (data) => {
    this.props.toggleVenue(data);
  }

  render() {

    let {foursquare, test, google} = this.props;
    let list = <p>Loading</p>;

    if(foursquare.isFetching === true){

      list = <p>Loading</p>;

    }
    else if(foursquare.isFetching === false && foursquare.items && foursquare.items.length >= 1){

      list = <ListGroup style={{textAlign: 'left'}}>
          {
            foursquare.items.map((item, id) => {
              return <ListItem 
                key={id} id={id} data={item} disableViewButton={test.disableViewButton}
                onToggleClick={this.onToggleClick}
                onViewClick={this.onViewClick}/>;
            })}
        </ListGroup>;

    }
    else if(foursquare.isFetching === false && foursquare.groups && foursquare.groups.length >= 1){

      list = <ListGroup style={{textAlign: 'left'}}>
          {
            foursquare.groups.map((item, id) => {
              return <ListGroupItem 
                key={id} id={id} data={item} disableViewButton={test.disableViewButton}
                onToggleClick={this.onToggleClick}
                onViewClick={this.onViewClick}/>;
            })}
        </ListGroup>;

    }
    else{

      list = <p>No data</p>;

    }

    const markers = [];
    if(google.markers && google.markers.length >= 1){
      google.markers.forEach(data => {
        let id = 0;
        let location = {};
        if(data.venue){
          id = data.venue.id;
          location = {
            lat: data.venue.location.lat, 
            lng: data.venue.location.lng 
          }
        }
        else{
          id = data.id;
          location = {
            lat: data.location.lat, 
            lng: data.location.lng 
          }
        }
        markers.push({
          id: id,
          location: location
        });
      })
    }

    return (
      <Grid>
        <Row>
          <Col xs={4}>
            {list}
          </Col>
          <Col xs={8}>
            <SearchBox 
              googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyAV6exvDcBNUhdAonHKE5Ty5Ny83f1UZ3o&libraries=geometry,drawing,places'
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              onPlacesChanged={this.onPlacesChanged}
            />
            <br />
            <Map 
              markers={markers}
              center={google.center}
              zoom={10}
              googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyAV6exvDcBNUhdAonHKE5Ty5Ny83f1UZ3o&libraries=geometry,drawing,places'
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              onMarkerClick={this.onMarkerClick}
              onCenterChanged={this.onCenterChanged}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default connect(
  (state) => {
    return state
  },actions)(Content)