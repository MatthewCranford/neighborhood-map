import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    places: [
      { 
        title: "Comedy Store",
        location: {
          lat: 34.095169, 
          lng: -118.373918
        }
      }
    ]
    
  };

  // onMarkerClick = (props, marker, e) => {
  //   console.log('Props: ',props)
  //   this.setState({
  //     selectedPlace: props,
  //     activeMarker: marker,
  //     showingInfoWindow: true
  //   });
  // }

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
        initialCenter={this.state.places[0].location}
        
      >
        {this.state.places.map((place, index) => 
          <Marker 
            position={place.location}
            name={'Current location'}
            key={index}
            onClick={this.onMarkerClick}
          />
        )};
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
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