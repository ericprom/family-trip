import React from 'react';
import Map from '../Map/Map';
import SearchBox from '../Map/SearchBox';
import ListItem from '../ListItem';
import {Col, Grid, ListGroup, Row} from 'react-bootstrap';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import * as foursquareActions from '../../actions/foursquare';

class Content extends React.Component {

  componentDidMount() {

    this.loadRecommendedVenues();
    //this.props.actions.fetchData('venues/categories?');
  }

  onViewClick = (data) => {
  //   let { google } = this.props;

  //   let ll = [google.center.lat,google.center.lng].join(',')
  //   this.props.actions.fetchData('venues/search?',{
  //     'll': ll,
  //     'categoryId': data.id
  //   });

  //   this.props.actions.hideViewButton(true);

    this.props.actions.toggleVenue(data);
    this.props.actions.setMapCenter({
      lat: data.location.lat, lng: data.location.lng
    });
  };

  onToggleClick = (data) => {
    if(data.categories && data.categories.length > 0){
      this.props.actions.loadMore(data);
    }
  };

  onPlacesChanged = (data) => {
    const places = data.getPlaces();
    places.map(({ place_id, formatted_address, geometry: { location } }) =>
      this.props.actions.setMapCenter({
        lat: location.lat(), lng: location.lng()
      })
    );

    this.loadRecommendedVenues();
  }

  loadRecommendedVenues = () => {
    let { google } = this.props;
    if(google.center){
      let ll = [google.center.lat,google.center.lng].join(',')
      this.props.actions.fetchData('venues/explore?',{
        'll': ll
      });
    }
  };

  onCenterChanged = (data) => {
    const center = data.getCenter();
    this.props.actions.setMapCenter({
      lat: center.lat(), lng: center.lng()
    });

   //this.loadRecommendedVenues();
  }

  onMarkerClick = (data) => {
    this.props.actions.toggleMarker(data);
  }

  render() {

    let {foursquare, google} = this.props;
    let list = <p>Loading</p>;

    if(foursquare.isFetching === true){

      list = <p>Loading</p>;

    }
    else if(foursquare.isFetching === false && foursquare.items && foursquare.items.length >= 1){

      list = <ListGroup style={{textAlign: 'left'}}>
          {
            foursquare.items.map((item, id) => {
              return <ListItem 
                key={id} id={id} data={item} disableViewButton={foursquare.disableViewButton}
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
        if(data.venue){
          markers.push({
            highlighted: data.highlighted,
            id: data.venue.id,
            location: {
              lat: data.venue.location.lat, 
              lng: data.venue.location.lng 
            }
          });
        }
        else{
          markers.push({
            highlighted: data.highlighted,
            id: data.id,
            location: {
              lat: data.location.lat, 
              lng: data.location.lng 
            }
          });
        }
      })
    }

    return (
      <Grid>
        <Row>
          <Col xs={4}>
            <div style={{height: 450 + 'px', overflowY: 'scroll'}}>{list}</div>
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
              zoom={13}
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

const mapStateToProps = (state, ownProps) => ({  
  foursquare: state.foursquare,
  google: state.google
});

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(foursquareActions, dispatch)
  };
}

const ContentContainer = connect(  
  mapStateToProps,
  mapDispatchToProps
)(Content);

export default ContentContainer