import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Content from '../Content/Content';

class App extends Component {
  render() {
    return (
      <div className="App">
         <Header />
         <br />
         <Content />
      </div>
    );
  }
}

export default App;
