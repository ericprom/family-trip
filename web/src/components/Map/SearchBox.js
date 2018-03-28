import React, { Component } from 'react';
import { withScriptjs } from "react-google-maps";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
const { StandaloneSearchBox } = require("react-google-maps/lib/components/places/StandaloneSearchBox");
let actions = require('../../actions/index');

class SearchBox extends Component {

  static propTypes = {
    onPlacesChanged: PropTypes.func,
  };

  render() {
    return(
      <StandaloneSearchBox
        ref='search'
        onPlacesChanged={() => this.props.onPlacesChanged(this.refs.search)}>
        <input
          type="text"
          placeholder="ค้นหาสถานที่เที่ยว"
          className="form-control"
        />
      </StandaloneSearchBox>
    );

  }
}

export default connect(
  (state) => {
    return state
  },actions)(withScriptjs(SearchBox))
