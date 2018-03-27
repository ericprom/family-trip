import React from 'react';
import ListGroupItem from '../ListGroupItem';
import {Col, Grid, ListGroup, Row} from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import {connect} from 'react-redux';
let actions = require('../../actions/index')

class Content extends React.Component {

  constructor(props) {
    super(props);


    this.state = {
      baseUrl: 'https://api.foursquare.com/v2/',
      clientId: 'J4EKPOE2HI1N5NDO5ZPDV4HXH1FFKZDWEOOLNA1MTJDUD2FE',
      clientSecret: 'PJOQIQLFJTPVP3IHN4HGRPK2RSFAHOHBRJTJ4PJEOYX4T5PV',
      categories: [],
      opened: false
    };
  }

  componentDidMount() {
    this.props.fetchData('venues/categories?');
  }

  onToggleClick = (data) => {
    this.props.fetchData('venues/search?',{
      'll': '12.7520739,99.7076712',
      'categoryId': data.id
    });
  };


  render() {
    let {foursquare} = this.props
    let result = <p>Loading</p>;
    if(foursquare.isFetching === true){
      result = result;
    }
    else if(foursquare.isFetching === false && foursquare.items.length >= 1){
      result = <Grid>
          <Row>
            <Col xs={4}>
              <ListGroup style={{textAlign: 'left'}}>
                {
                  foursquare.items.map((item, id) => {
                    return <ListGroupItem 
                      key={id} id={id} data={item}
                      onToggleClick={this.onToggleClick}/>;
                  })}
              </ListGroup>
            </Col>
          </Row>
        </Grid>;
    }
    else{
      result = <p>No data</p>;
    }
    return result;
  }
}

export default connect(
  (state) => {
    return state
  },actions)(Content)