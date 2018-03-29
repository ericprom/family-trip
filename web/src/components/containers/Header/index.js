import React, { Component } from 'react'
import {bindActionCreators} from "redux"
import {connect} from 'react-redux'
import { SearchBox } from '../../presentations'
import { Navbar } from 'react-bootstrap'
import * as foursquareActions from '../../../actions/foursquare'
import * as weatherActions from '../../../actions/weather'

class Header extends Component {

	componentDidMount() {
    	//this.loadRecommendedVenues();
    	this.loadCategories();
    	this.loadVenues({
    		'categoryId': '4d4b7105d754a06377d81259',
	        'intent':'browse',
	        'radius': 5000,
    		'limit': 20,
    	});
  	}

	onPlacesChanged = (data) => {
	    const places = data.getPlaces();
	    places.map(({ place_id, formatted_address, geometry: { location } }) =>
	      	this.props.actions.setMapCenter({
	        	lat: location.lat(), lng: location.lng()
	      	})
	    )

	    //this.loadRecommendedVenues()
    	this.loadVenues();
  	}

  	loadCategories = () => {
	    this.props.actions.fetchData('venues/categories?')
  	}

  	loadRecommendedVenues = () => {
	    let { google } = this.props
	    if(google.center){
	      	let ll = [google.center.lat,google.center.lng].join(',')
	      	this.props.actions.fetchData('venues/explore?',{
	        	'll': ll
	      	})
	      	this.props.forecast.fetchData('locations/v1/cities/geoposition/search?',{
	      	  'q': ll
	      	})
	    }
  	}

  	loadVenues = (queryObj = {}) => {
	    let { google } = this.props
	    if(google.center){
	      	let ll = [google.center.lat,google.center.lng].join(',')
	      	let query = Object.assign({
	        	'll': ll
	      	}, queryObj)
	      	this.props.actions.fetchData('venues/search?',query)

	      	this.props.forecast.fetchData('locations/v1/cities/geoposition/search?',{
	      	  'q': ll
	      	})
	    }
  	}

	render() {
		let googleMapAPI = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAV6exvDcBNUhdAonHKE5Ty5Ny83f1UZ3o&libraries=geometry,drawing,places'
    	return (
			<Navbar fixedTop>
			  	<Navbar.Header>
				    <Navbar.Brand>
				      	<a href="#home">Family Trip</a>
				    </Navbar.Brand>
				    <Navbar.Toggle />
			  	</Navbar.Header>
			  	<Navbar.Collapse>
				    <Navbar.Form pullLeft>
				      	<SearchBox 
				          	googleMapURL={googleMapAPI}
				          	loadingElement={<div style={{ height: `100%` }} />}
				          	containerElement={<div style={{ height: `100%` }} />}
				          	onPlacesChanged={this.onPlacesChanged}
				        />
				    </Navbar.Form>
			  	</Navbar.Collapse>
			</Navbar>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({  
  google: state.google,
});

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators(foursquareActions, dispatch),
      forecast: bindActionCreators(weatherActions, dispatch),
  };
}

const HeaderContainer = connect(  
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer