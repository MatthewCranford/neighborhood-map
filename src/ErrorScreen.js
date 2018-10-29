import React, { Component } from 'react';
import './App.css';

class ErrorScreen extends Component {
  state = {
    errMsg: 'Error: Problem loading Google Maps API'
  }

  render() {
    return (
      <h1 className='error-screen-message'>{this.state.errMsg}</h1>
    )
  }
}

export default ErrorScreen;
