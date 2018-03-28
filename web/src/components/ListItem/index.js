import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, ListGroupItem} from 'react-bootstrap';

class ListItem extends Component {
  
  static propTypes = {
    canView: PropTypes.bool,
    data: PropTypes.object,
    onToggleClick: PropTypes.func,
    onViewClick: PropTypes.func,
  };

  render() {
    let bntClass = 'pull-right btn-xs btn-default';
    if(this.props.data.highlighted){
      bntClass = 'pull-right btn-xs btn-danger';
    }
    return (
        <ListGroupItem>
          <span style={{marginLeft: 10+'px'}}
            onClick={() => this.props.onToggleClick(this.props.data)}>
            {this.props.data.name}
          </span>
          <Button className={bntClass}
            onClick={() => this.props.onViewClick(this.props.data)}>
            <i className="fa fa-map-marker-alt"></i>
          </Button>
        </ListGroupItem>
    );
  }
}

export default ListItem;