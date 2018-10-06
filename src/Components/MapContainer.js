import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }

    const sunsetStrip= {
      lat: 34.090698,
      lng: -118.386002
    }

    return (
      <Map google={this.props.google} zoom={14} style={style} initialCenter={sunsetStrip}>
        {/* <Marker onClick={this.onMarkerClick} name={'Current location'}/> */}
        {/* <InfoWindow onClose={this.onInfoWindowClose}>
          <div>Test</div>
        </InfoWindow> */}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDohVkBpsX5m5lpmOXeS69UubK3rSaK2x8'
})(MapContainer)