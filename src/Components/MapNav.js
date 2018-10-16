import React, { Component } from 'react';
import '../App.css';

class MapNav extends Component {
  render() {
    return(
      <div>
        <nav className="map-nav">
          <div className="hamburger-container">
            <div className="hamburger-bar"></div>
            <div className="hamburger-bar"></div>
            <div className="hamburger-bar"></div>
          </div>
          <h1 className="nav-title">Popular Comedy Clubs</h1>
        </nav>
        <div className="map-sidebar">
          <input className="sidebar-input"></input>
          <ul>
            {this.props.places.map((place) => {
              return <li>{place.name}</li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default MapNav;