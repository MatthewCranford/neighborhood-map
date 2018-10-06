import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

  render() {
    return (
      <Map google={this.props.google}></Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDohVkBpsX5m5lpmOXeS69UubK3rSaK2x8'
})(MapContainer)