import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as FourSquareAPI from '../APIs/FourSquare'

class MapContainer extends Component {
  state = {
    bounds: {},
    selectedPlace: {},
    likes: '',
    img: '',
    activeMarker: {},
    showingInfoWindow: true,
    center: {}
  };

  componentDidMount() {
    this.setBounds();
    this.setState({ center: this.props.centerCoords.location})
  }

  setBounds = () => {
    const bounds = new this.props.google.maps.LatLngBounds();
    for (let place of this.props.places) {
      bounds.extend(place.location);
    }
    this.setState({ bounds });
  }

  onMarkerClick = (props, marker) => {
    this.getFourSquareData(props.position.lat, props.position.lng, props.title);
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: props,
    });
  }

  // Fetch FourSquare data
  getFourSquareData = (lat, lng, name) => {
    const size = 150
    FourSquareAPI.getFourSquareVenueID(lat, lng, name)
      .then((venueId) => {
        FourSquareAPI.getFourSquareVenueInfo(venueId)
          .then((venueInfo) => {
            this.setState({
              likes: venueInfo.likes.count,
              photo: venueInfo.bestPhoto.prefix + size + venueInfo.bestPhoto.suffix
            });
          })
          .catch((e) => console.log(e));
    })
    .catch((e) => console.log(e));
  }

  render() {
    const mapStyle = {
      width: '100%',
      height: '100%'
    };

    return (
      <div>
        <Map 
          google={this.props.google} 
          zoom={14} 
          style={mapStyle} 
          center={this.state.center}
          bounds={this.state.bounds}
        >
          {this.props.places.map((place, index) => 
            <Marker 
              key={index}
              name={place.name}
              title={place.name}
              position={{lat: place.location.lat, lng: place.location.lng}}
              onClick={this.onMarkerClick}
              animation={this.state.activeMarker.name === place.name &&this.props.google.maps.Animation.BOUNCE}
            />
          )}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <img src={this.state.photo} alt={this.state.selectedPlace.name}/>
              <h3>Likes: {this.state.likes}</h3>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDohVkBpsX5m5lpmOXeS69UubK3rSaK2x8'
})(MapContainer);