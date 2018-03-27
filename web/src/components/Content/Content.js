import React from 'react';
import ListItem from '../ListItem';
import {Col, Grid, ListGroup, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
let actions = require('../../actions/index');

class Content extends React.Component {

  componentDidMount() {
    this.props.fetchData('venues/categories?');
  }

  onViewClick = (data) => {
    this.props.fetchData('venues/search?',{
      'll': '12.7520739,99.7076712',
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
    let result = <p>Loading</p>;

    if(foursquare.isFetching === true){

      result = <p>Loading</p>;

    }
    else if(foursquare.isFetching === false && foursquare.items.length >= 1){

      result = <Grid>
          <Row>
            <Col xs={4}>
              <ListGroup style={{textAlign: 'left'}}>
                {
                  foursquare.items.map((item, id) => {
                    return <ListItem 
                      key={id} id={id} data={item} disableViewButton={test.disableViewButton}
                      onToggleClick={this.onToggleClick}
                      onViewClick={this.onViewClick}/>;
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