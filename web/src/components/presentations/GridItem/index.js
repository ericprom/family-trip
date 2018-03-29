import React from 'react'
import { Col, Button, Thumbnail } from 'react-bootstrap'

export default (props) => {
  
  const item = props.item

  if(typeof item === 'undefined'){
    return (<div>No data</div>)
  }

  let categories = []
  if(item.categories && item.categories.length >= 1){
    item.categories.forEach((category)=>{
      categories.push(category)
    })
  }


  const onViewClick = (item) => {
     props.onViewClick(item)
  }

  let bntClass = 'btn-block btn-default'
  if(item.highlighted){
    bntClass = 'btn-block btn-danger'
  }

  return (
    <Col xs={12} sm={6}>
      <Thumbnail src="http://via.placeholder.com/242x200" alt="242x200">
        <h3>{item.name}</h3>
        <p>
        {
          categories.map((item, id) => {
            return <span key={item.id}>
              <img src={item.icon.prefix+'bg_32'+item.icon.suffix} style={{width: `15px`}}/>
              <span style={{marginLeft: `5px`}}>{item.name}</span>
            </span>
          })
        }
        </p>
        <p>
          <Button className={bntClass} bsStyle="default" 
          onClick={() => onViewClick(item)}>
            <i className="fa fa-map-marker-alt" /> View Map
          </Button>
        </p>
      </Thumbnail>
    </Col>
  )
}