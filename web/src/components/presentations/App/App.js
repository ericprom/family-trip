import React, { Component } from 'react'
import './App.css'
import { Col, Row } from 'react-bootstrap'
import { Header, Forecast, Googlemap, Foursquare} from '../../containers'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
      	<Row>
      		<Col xs={12} sm={8}>
            <div style={{height: (window.innerHeight-50) + 'px', overflowY: 'scroll', margin: `0px 10px 10px 10px`}}> <Row>
              <Col>
                <div style={{marginLeft: `15px`,marginRight: `15px`}}>
                 <Forecast />
                </div>
              </Col>
            </Row>
      			 <Foursquare />
            </div>
      		</Col>
      		<Col xsHidden sm={4} style={{padding: `0px`}}>
      			<Googlemap />
      		</Col>
      	</Row>
      </div>
    );
  }
}

export default App;
