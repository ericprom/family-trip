import React, { Component } from 'react'
import { GridItem } from '../../presentations'
import { Row } from 'react-bootstrap'
import { bindActionCreators } from "redux"
import { connect } from 'react-redux'
import * as foursquareActions from '../../../actions/foursquare'

class Foursquare extends Component {

  onViewClick = (data) => {
    this.props.actions.toggleVenue(data)
    this.props.actions.setMapCenter({
      lat: data.location.lat, lng: data.location.lng
    })
  }

  render() {

    let { foursquare } = this.props;

    if(foursquare.categories.length >= 1){

    }

    return (
      <Row>
        {
          foursquare.items.map((item, id) => {
            return <GridItem 
              key={id} id={id} item={item}
              onViewClick={this.onViewClick}/>
          })}
      </Row>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({  
  foursquare: state.foursquare,
  google: state.google
})

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(foursquareActions, dispatch)
  }
}

const FoursquareContainer = connect(  
  mapStateToProps,
  mapDispatchToProps
)(Foursquare);

export default FoursquareContainer