import React, { Component } from 'react'
import { ForecastItem } from '../../presentations'
import {bindActionCreators} from "redux"
import {connect} from 'react-redux';
import * as weatherActions from '../../../actions/weather'

class Forecast extends Component {

  componentDidMount() {

    let { google } = this.props
    if(google.center){
      let ll = [google.center.lat,google.center.lng].join(',')
      this.props.forecast.fetchData('locations/v1/cities/geoposition/search?',{
        'q': ll
      })
    }
  }


  render() {

    const { weather } = this.props
    
    return (
      <div className='weather-container'>
        {
          weather.items.map((item, id) => {
            return <ForecastItem 
              key={id} id={id} item={item}/>
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  google: state.google,  
  weather: state.weather
});

const mapDispatchToProps = (dispatch) => {
  return {
      forecast: bindActionCreators(weatherActions, dispatch),
  }
}

const ForecastContainer = connect(  
  mapStateToProps,
  mapDispatchToProps
)(Forecast)

export default ForecastContainer