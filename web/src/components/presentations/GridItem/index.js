import React from 'react'
import { Col, Button, Thumbnail } from 'react-bootstrap'
import './style.css';

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

  let poster = "http://via.placeholder.com/386x300?text="+item.name
  if(item.photos && item.photos.length >= 1){
    poster = item.photos[0].path
  }

  return (
    <Col xs={12} sm={6}>
      <Thumbnail src={poster} alt="poster">
        <h3>{item.name}</h3>
        <p>
        {
          categories.map((item, id) => {
            return <span key={item.id}>
              <img src={item.icon.prefix+'bg_32'+item.icon.suffix} style={{width: `15px`}} alt="icon"/>
              <span style={{marginLeft: `5px`}}>{item.name}</span>
            </span>
          })
        }
        </p>
        <p>
          <Button className={bntClass} bsStyle="default" 
          onClick={() => onViewClick(item)}>
            <i className="fa fa-map-marker-alt" /> ดูตำแหน่ง
          </Button>
        </p>
      </Thumbnail>
    </Col>
  )
}