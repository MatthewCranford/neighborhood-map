import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

  state = {
    places: [
      { 
        title: "Comedy Store",
        location: {
          lat: 34.095169, 
          lng: -118.373918
        }
      }
    ]
    
  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    }



    return (
      <Map google={this.props.google} zoom={14} style={style} initialCenter={this.state.places[0].location}>
        {this.state.places.map((place, index) => 
          <Marker 
            position={place.location}
            title={place.title}
            key={index}
          />
        )}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDohVkBpsX5m5lpmOXeS69UubK3rSaK2x8'
})(MapContainer)