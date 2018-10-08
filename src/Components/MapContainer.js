import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker) => {
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: props
    });
  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    };

    return (
      <Map 
        google={this.props.google} 
        zoom={14} 
        style={style} 
        initialCenter={this.props.places[0].location}
      >
        {this.props.places.map((place, index) => 
          <Marker 
            position={{lat: place.location.lat, lng: place.location.lng}}
            key={index}
            onClick={this.onMarkerClick}
            name={place.name}
          />
        )}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDohVkBpsX5m5lpmOXeS69UubK3rSaK2x8'
})(MapContainer);