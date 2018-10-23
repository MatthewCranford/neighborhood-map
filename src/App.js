import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer';
import MapNav from"./components/MapNav";

class App extends Component {
  state = {
    places: [
      { 
        name: "The Comedy Store",
        location: {
          lat: 34.095169, 
          lng: -118.373918
        }
      },
      { 
        name: "Hollywood Improv Comedy Club",
        location: {
          lat: 34.083434, 
          lng: -118.367281
        }
      },
      { 
        name: "Laugh Factory",
        location: {
          lat: 34.098247, 
          lng: -118.364478 
        }
      },
      { 
        name: "The Groundlings Theatre & School",
        location: {
          lat: 34.083694, 
          lng: -118.348995
        }
      },
      { 
        name: "The Second City Hollywood",
        location: {
          lat: 34.101312, 
          lng: -118.333004
        }
      }
    ],
    currentPlaces: []
  };

  componentDidMount() {
    this.setState({ currentPlaces: this.state.places });
  }

  filterPlaces = (query) => {  
    if (!query) {
      this.setState({ currentPlaces: [] });
    }
    const filteredPlaces = this.state.places.filter((place) => place.name.toLowerCase().includes(query.toLowerCase()));  
    this.setState({ currentPlaces: filteredPlaces });
  }

  setActiveMarker = (marker) => {
    document.querySelector(`[title="${marker}"]`).click();
  }
  
  render() {
    return (
      <div className="App">
        <MapNav places={this.state.currentPlaces} onQuery={this.filterPlaces} setActiveMarker={this.setActiveMarker}/>
        <MapContainer places={this.state.currentPlaces} centerCoords={this.state.places[0].location} activeMarker={this.state.activeMarker} showingInfoWindow={this.state.showingInfoWindow}/>  
      </div>
    );
  }
}

export default App;
