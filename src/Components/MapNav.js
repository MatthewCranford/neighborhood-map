import React, { Component } from 'react';
import '../App.css';

class MapNav extends Component {
  state = {
    hamburgerActive: false,
    query: ''
  }

  // Toggle sidebar
  onHamburgerClick = () => {
    const sidebar = document.querySelector('.map-sidebar');
    if (this.state.hamburgerActive) {
      sidebar.style.transform = 'translateX(-250px)'
      this.setState({ hamburgerActive: false });
    }
    else {
      sidebar.style.transform = 'translateX(0px)'
      this.setState({ hamburgerActive: true });
    }
  }

  render() {
    return(
      <div>
        <div className="map-nav-container">
          <nav className="map-nav">
            <button aria-label='Hamburger Menu' tabIndex='0' className="hamburger-container" onClick={this.onHamburgerClick}> 
              <div className="hamburger-bar"></div>
              <div className="hamburger-bar"></div>
              <div className="hamburger-bar"></div>
            </button>
            <div className="nav-title">
              <h1>Popular Comedy Clubs</h1>
              <h4>Powered by FourSquare</h4>
            </div>
          </nav>
        </div>
        <div className="map-sidebar">
            <input aria-label='Search Filter' className="sidebar-input" onChange={(e) => this.props.onQuery(e.target.value)}></input>
            <ul>
              {this.props.places.map((place, index) => {
                return <li key={index}>
                  <button aria-label='Place Location' tabIndex='0' onClick={() => this.props.setActiveMarker(place.name)}>{place.name}</button>
                </li>
              })}
            </ul>
          </div>
      </div>
    )
  }
}

export default MapNav;