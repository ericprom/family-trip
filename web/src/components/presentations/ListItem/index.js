import React from 'react';
import {Button, ListGroupItem} from 'react-bootstrap';

export default (props) => {
  
  const item = props.item

  if(typeof item === 'undefined'){
    return (<div>No data</div>)
  }

  const onViewClick = (item) => {
     props.onViewClick(item);
  }

  const onToggleClick = (item) => {
     props.onToggleClick(item);
  }

  let bntClass = 'pull-right btn-xs btn-default';
  if(item.highlighted){
    bntClass = 'pull-right btn-xs btn-danger';
  }

  return (
      <ListGroupItem>
        <span style={{marginLeft: 10+'px'}}
          onClick={() => onToggleClick(item)}>
          {item.name}
        </span>
        <Button className={bntClass}
          onClick={() => onViewClick(item)}>
          <i className="fa fa-map-marker-alt"></i>
        </Button>
      </ListGroupItem>
  )
}