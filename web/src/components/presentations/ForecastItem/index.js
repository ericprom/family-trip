import React from 'react';
import './style.css';
import Moment from 'react-moment';

export default (props) => {
  const item = props.item

  if(typeof item === 'undefined'){
    return (<div>No data</div>)
  }

  let pad = (number, length) => {
    var str = '' + number
    while (str.length < length) {
        str = '0' + str
    }
    return str

  }

  const icon = 'wi icon-accu'+pad(item.Day.Icon, 2)

  return (
    <div className='weather-column'>
      <div style={{textAlign: 'left'}}>
        <Moment format="DD/MM/YYYY">{item.Date}</Moment>
      </div>
      <div style={{textAlign: 'center'}}>
        <i className={icon}></i>
      </div>
      <div style={{textAlign: 'left'}}>
        {item.Temperature.Minimum.Value+'/'+item.Temperature.Maximum.Value}
      </div>
      <div style={{textAlign: 'left'}}>
        {item.Day.IconPhrase}
      </div>
    </div>
  )
}