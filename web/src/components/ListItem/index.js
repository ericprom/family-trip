import React from 'react';
import PropTypes from 'prop-types';
import {Button, ListGroupItem} from 'react-bootstrap';

class ListItem extends React.Component {
  
  static propTypes = {
    canView: PropTypes.bool,
    data: PropTypes.object,
    onToggleClick: PropTypes.func,
    onViewClick: PropTypes.func,
  };

  render() {
    let icon = '';
    if(this.props.data.icon){
      icon = <img src={this.props.data.icon.prefix+'bg_32'+this.props.data.icon.suffix} alt=""/>;
    }

    let name = <span style={{marginLeft: 10+'px'}}
        onClick={() => this.props.onToggleClick(this.props.data)}>
        {this.props.data.name}
      </span>;

    let viewButton = '';

    if(this.props.disableViewButton === false){
      viewButton = <Button className="pull-right btn-xs btn-default"
          onClick={() => this.props.onViewClick(this.props.data)}>
          View
        </Button>;
    }
          
    return (
        <ListGroupItem>
          {icon}
          {name}
          {viewButton}
        </ListGroupItem>
    );
  }
}


export default ListItem;