import React, { Component } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer';
import MapNav from"./Components/MapNav";
import * as FourSquareAPI from './APIs/FourSquare';

class App extends Component {
  state = {
    places: [
      { 
        name: "The Comedy Store",
        location: {
          lat: 34.095169, 
          lng: -118.373918
        },
        img: '',
        likes: ''
      },
      { 
        name: "Hollywood Improv Comedy Club",
        location: {
          lat: 34.083434, 
          lng: -118.367281
        },
        img: '',
        likes: ''
      },
      { 
        name: "Laugh Factory",
        location: {
          lat: 34.098247, 
          lng: -118.364478 
        },
        img: '',
        likes: ''
      },
      { 
        name: "The Groundlings Theatre & School",
        location: {
          lat: 34.083694, 
          lng: -118.348995
        },
        img: '',
        likes: ''
      },
      { 
        name: "The Second City Hollywood",
        location: {
          lat: 34.101312, 
          lng: -118.333004
        },
        img: '',
        likes: ''
      }
    ],
    currentPlaces: [],
    requestAvailable: true
  };

  componentDidMount() {
    this.getFourSquareData();
  }

  // Fetch FourSquare data from API
  getFourSquareData = () => {
    const newPlaces = this.state.places.map((place) => {
      const size = 150
      FourSquareAPI.getFourSquareVenueID(place.location.lat, place.location.lng, place.name)
        .then((venueId) => {
          FourSquareAPI.getFourSquareVenueInfo(venueId)
            .then((venueInfo) => {
              place.likes = venueInfo.likes.count
              place.img = venueInfo.bestPhoto.prefix + size + venueInfo.bestPhoto.suffix
            })
            .catch(() => this.setState({ requestAvailable: false })
        )})
        .catch((e) => alert(e));
      return place;
    });
    this.setState({ currentPlaces: newPlaces });
  }
  
  // Filter a new array of current places based on user query
  filterPlaces = (query) => {  
    if (!query) {
      this.setState({ currentPlaces: [] });
    }
    const filteredPlaces = this.state.places.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));  
    this.setState({ currentPlaces: filteredPlaces });
  }

  // Set active marker when clicking list item
  setActiveMarker = (marker) => {
    document.querySelector(`[title="${marker}"]`).click();
  }

  render() {
    return (
      <div className="App">
        <MapNav places={this.state.currentPlaces} onQuery={this.filterPlaces} setActiveMarker={this.setActiveMarker}/>
        <MapContainer places={this.state.currentPlaces} centerCoords={this.state.places[0].location} activeMarker={this.state.activeMarker} showingInfoWindow={this.state.showingInfoWindow} requestAvailable={this.state.requestAvailable}/>  
      </div>
    );
  }
}

export default App;
