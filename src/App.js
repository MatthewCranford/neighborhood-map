import React, { Component } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer';

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
    ]
  };
  
  render() {
    return (
      <div className="App">
        <MapContainer places={this.state.places}/>
      </div>
    );
  }
}

export default App;
