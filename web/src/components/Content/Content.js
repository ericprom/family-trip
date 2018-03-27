import React from 'react';
import CategoryItem from '../CategoryItem';
import {Col, Grid, ListGroup, Row} from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

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
    this.loadCategories();
  }

  encodeQueryData = (data) => {
    let ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
  }

  loadCategories = () => {
    var query = { 
      'client_id': this.state.clientId, 
      'client_secret': this.state.clientSecret, 
      'locale': 'th', 
      'v': moment().format('YYYYMMDD') };
    
    axios.get(this.state.baseUrl+'venues/categories?'+ this.encodeQueryData(query))
      .then(response => {
        this.setState(prevState => ({
          categories: response.data.response.categories
        }));
      })
      .catch(error => {
        console.log(error);
      });
  };

  getVenues = (data) => {
    var query = { 
      'client_id': this.state.clientId, 
      'client_secret': this.state.clientSecret, 
      'locale': 'th', 
      'v': moment().format('YYYYMMDD'),
      'll': '12.7520739,99.7076712',
      'categoryId': data.id
    };
    
    axios.get(this.state.baseUrl+'venues/search?'+ this.encodeQueryData(query))
      .then(response => {
        console.log(response.data.response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  onToggleClick = (data) => {
    // const { opened } = this.state;
    // this.setState({
    //   opened: !opened,
    // });
    // this.getVenues(data);

    if(data.categories.length > 0){
      this.setState(prevState => ({
        categories: data.categories
      }));
    }
  };

  render() {

    const { categories, opened } = this.state;

    let items = <ListGroup style={{textAlign: 'left'}}>
                      {categories.map((item, id) => {
                        return <CategoryItem 
                          key={id} id={id} data={item}
                          onToggleClick={this.onToggleClick}/>;
                      })}
                    </ListGroup>;
    return (
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              {items}
            </Col>
            <Col xs={12} md={8}>

            </Col>
          </Row>
        </Grid>
    );
  }
}


export default Content;