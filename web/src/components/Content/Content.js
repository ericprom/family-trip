import React from 'react';
import Map from '../Map';
import ListItem from '../ListItem';
import {Col, Grid, ListGroup, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
let actions = require('../../actions/index');

class Content extends React.Component {

  componentDidMount() {

    this.props.setCenterMap({
      lat: 13.7978114, lng: 100.4627011
    });

    this.props.fetchData('venues/categories?');
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

  render() {

    let {foursquare, test} = this.props;
    let list = <p>Loading</p>;

    if(foursquare.isFetching === true){

      list = <p>Loading</p>;

    }
    else if(foursquare.isFetching === false && foursquare.items.length >= 1){

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
    else{

      list = <p>No data</p>;

    }

    let map = <Map 
      googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyAV6exvDcBNUhdAonHKE5Ty5Ny83f1UZ3o&libraries=geometry,drawing,places'
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />;
    
    return (
      <Grid>
        <Row>
          <Col xs={4}>
            {list}
          </Col>
          <Col xs={8}>
            {map}
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