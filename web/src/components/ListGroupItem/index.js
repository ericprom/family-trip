import React from 'react';
import PropTypes from 'prop-types';
import {ListGroupItem} from 'react-bootstrap';

class CategoryItem extends React.Component {
  
  static propTypes = {
    name: PropTypes.string,
    onToggleClick: PropTypes.func,
  };

  render() {
    return (
        <ListGroupItem>
          <img src={this.props.data.icon.prefix+'bg_32'+this.props.data.icon.suffix}/>
          <span style={{marginLeft: 10+'px'}}
            onClick={() => this.props.onToggleClick(this.props.data)}>
            {this.props.data.name}
          </span>
          <span className="badge badge-secondary">
            {this.props.data.categories.length > 1 && this.props.data.categories.length}
          </span>
        </ListGroupItem>
    );
  }
}


export default CategoryItem;