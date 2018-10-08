import React, { Component } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer';

class App extends Component {

  state = {
    places: [
      { 
        name: "Comedy Store",
        location: {
          lat: 34.095169, 
          lng: -118.373918
        }
      }
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
