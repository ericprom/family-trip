import React, { Component } from 'react';
import './style.css';
import Moment from 'react-moment'
import { FlexyFlipCard } from 'flexy-flipcards'

class ForecastItem extends Component {

  pad = (number, length) => {
    var str = '' + number
    while (str.length < length) {
        str = '0' + str
    }
    return str

  }


  render() {

    const dayIcon = 'wi icon-accu'+this.pad(this.props.item.Day.Icon, 2)
    const nightIcon = 'wi icon-accu'+this.pad(this.props.item.Night.Icon, 2)

    return (
      <div style={{width:20+'%', float:'left'}}>
        <FlexyFlipCard 
          frontBackgroundColor="#fff"
          backBackgroundColor="#fff">
          <div ref='flipper'>
            <div style={{textAlign: 'left'}}>
              กลางวัน: <Moment format="DD/MM/YYYY">{this.props.item.Date}</Moment>
            </div>
            <div style={{textAlign: 'center'}}>
              <i className={dayIcon}></i>
            </div>
            <div style={{textAlign: 'left'}}>
              {this.props.item.Temperature.Minimum.Value+'/'+this.props.item.Temperature.Maximum.Value}
            </div>
            <div style={{textAlign: 'left'}}>
              {this.props.item.Day.IconPhrase}
            </div>
          </div>
          <div ref='flipper'>
            <div style={{textAlign: 'left'}}>
              กลางคืน: <Moment format="DD/MM/YYYY">{this.props.item.Date}</Moment>
            </div>
            <div style={{textAlign: 'center'}}>
              <i className={nightIcon}></i>
            </div>
            <div style={{textAlign: 'left'}}>
              {this.props.item.Temperature.Minimum.Value+'/'+this.props.item.Temperature.Maximum.Value}
            </div>
            <div style={{textAlign: 'left'}}>
              {this.props.item.Night.IconPhrase}
            </div>
          </div>
        </FlexyFlipCard>
      </div>
    )
  }
}
export default ForecastItem