import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {

  state = {
    bounds: {},
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  componentDidMount() {
    this.setBounds();
  }

  setBounds = () => {
    const bounds = new this.props.google.maps.LatLngBounds();
    for (let place of this.props.places) {
      bounds.extend(place.location);
    }
    this.setState({bounds});
  }

  getFourSquare = (lat, lng, name) => {
    fetch(`https://api.foursquare.com/v2/venues/search?client_id=X4CMVBAJQSVZYXB45ZGE3GNA43RTCMPQTM4PUIKMQHFYWUVX&client_secret=ODC00AI1UEPGLLYLVUOY1JM30NE1XADBZRJMUNXKXPSZKNTR&v=20180323&limit=1&ll=${lat},${lng}&query=${name}`)
    .then((response) => response.json())
    .then((response) => console.log(response)) 
  }

  onMarkerClick = (props, marker) => {
    console.log('Marker', marker);
    console.log('Props', props);
    this.getFourSquare(props.position.lat, props.position.lng, props.title);
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
        bounds={this.state.bounds}
      >
        {this.props.places.map((place, index) => 
          <Marker 
            key={index}
            name={place.name}
            title={place.name}
            position={{lat: place.location.lat, lng: place.location.lng}}
            onClick={this.onMarkerClick}
            
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