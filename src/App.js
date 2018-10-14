import React, { Component } from 'react';
import './App.css';
import MapContainer from './Components/MapContainer';
import MapNav from './Components/MapNav';

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
    ]
  };
  
  render() {
    const style  = {
      width: '100%',
      position: 'absolute',
      background: 'white'
    };

    return (
      <div className="App">
        <MapContainer places={this.state.places}/>  
        <div style={style}>
          <MapNav/>
        </div>
      </div>
    );
  }
}

export default App;
