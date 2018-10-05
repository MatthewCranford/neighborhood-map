import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';

export class Map extends Component {

  render() {
    return (
      <div id="map">Map</div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDohVkBpsX5m5lpmOXeS69UubK3rSaK2x8'
})(Map)