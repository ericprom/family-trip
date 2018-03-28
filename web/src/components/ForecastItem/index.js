import React from 'react';
import PropTypes from 'prop-types';
import {Col} from 'react-bootstrap';
import Moment from 'react-moment';

class Forecast extends React.Component {
  
  static propTypes = {
    data: PropTypes.object
  };

  pad = (number, length) => {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }

    return str;

  }

  render() {
    let icon = 'wi icon-accu'+this.pad(this.props.data.Day.Icon, 2);
    return (
      <Col xs={2}>
        <div>
          <Moment format="DD/MM/YYYY">{this.props.data.Date}</Moment>
        </div>
        <i className={icon}></i>
        <div>
          {this.props.data.Temperature.Minimum.Value+'/'+this.props.data.Temperature.Maximum.Value}
        </div>
        <div>
          {this.props.data.Day.IconPhrase}
        </div>
      </Col>
    );
  }
}


export default Forecast;