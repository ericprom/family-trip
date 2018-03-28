import React, { Component } from 'react'
import './App.css'
import {Col, Grid, Row} from 'react-bootstrap'
import { Forecast, Googlemap, Foursquare} from '../../containers'

class App extends Component {
  render() {
    return (
      <Grid>
      	<Row>
      		<Col>
      			<Forecast />
      		</Col>
      	</Row>
      	<Row>
      		<Col xs={4}>
      			<Foursquare />
      		</Col>
      		<Col xs={8}>
      			<Googlemap />
      		</Col>
      	</Row>
      </Grid>
    );
  }
}

export default App;
