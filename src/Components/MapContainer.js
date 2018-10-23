import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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

  // FourSquare API get Data functions
  getFourSquareData = (lat, lng, name) => {
    const size = 150
    this.getFourSquareVenueID(lat, lng, name)
      .then((venueId) => {
        this.getFourSquareVenueInfo(venueId)
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

  getFourSquareVenueID = (lat, lng, name) => {
    return fetch(`https://api.foursquare.com/v2/venues/search?client_id=X4CMVBAJQSVZYXB45ZGE3GNA43RTCMPQTM4PUIKMQHFYWUVX&client_secret=ODC00AI1UEPGLLYLVUOY1JM30NE1XADBZRJMUNXKXPSZKNTR&v=20180323&limit=1&ll=${lat},${lng}&query=${name}`)
    .then((response) => response.json())
    .then((response) => response.response.venues[0].id);

  }

  getFourSquareVenueInfo = (venueId) => {
    return fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=X4CMVBAJQSVZYXB45ZGE3GNA43RTCMPQTM4PUIKMQHFYWUVX&client_secret=ODC00AI1UEPGLLYLVUOY1JM30NE1XADBZRJMUNXKXPSZKNTR&v=20180323`)
    .then((response) => response.json())
    .then((response) => response.response.venue);
  }

  render() {
    const style = {
      width: '100%',
      height: '100%'
    };

    return (
      <div>
        <Map 
          google={this.props.google} 
          zoom={14} 
          style={style} 
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