import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapNav from"./MapNav";

class MapContainer extends Component {
  state = {
    bounds: {},
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    likes: '',
    img: '',
    currentPlaces: []
  };

  componentDidMount() {
    this.setBounds();
    this.updateCurrentPlaces(this.props.places);
  }

  updateCurrentPlaces = (places) => {
    this.setState({ currentPlaces: places });
  }

  setBounds = () => {
    const bounds = new this.props.google.maps.LatLngBounds();
    for (let place of this.props.places) {
      bounds.extend(place.location);
    }
    this.setState({bounds});
  }

  getFourSquareData = (lat, lng, name) => {
    const size = 150
    this.getFourSquareVenueID(lat, lng, name).then((venueId) => {
      this.getFourSquareVenueInfo(venueId).then((venueInfo) => {
        this.setState({
          likes: venueInfo.likes.count,
          photo: venueInfo.bestPhoto.prefix + size + venueInfo.bestPhoto.suffix
        });
      });
    });
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

  onMarkerClick = (props, marker) => {
    this.getFourSquareData(props.position.lat, props.position.lng, props.title);
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
      <div>
        <MapNav places={this.props.places} onChange={this.updateCurrentPlaces}></MapNav>
        <Map 
          google={this.props.google} 
          zoom={14} 
          style={style} 
          initialCenter={this.props.places[0].location}
          bounds={this.state.bounds}
        >
          {this.state.currentPlaces.map((place, index) => 
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