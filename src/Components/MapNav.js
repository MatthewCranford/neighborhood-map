import React, { Component } from 'react';
import '../App.css';

class MapNav extends Component {
  state = {
    hamburgerActive: false,
    currentPlaces: [],
  }

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
    this.setState({ currentPlaces: this.props.places })
  }

  updateQuery = (e) => {
    const query = e.target.value
    if (query.length) {
      this.setState({ currentPlaces: 
        this.props.places.filter((place) => place.name.toLowerCase().includes(query.trim()))
      });
    }
    else {
      this.setState({ currentPlaces: this.props.places})
    }
  }

  render() {
    return(
        <div className="map-nav-container">
          <nav className="map-nav">
            <div className="hamburger-container" onClick={this.onHamburgerClick}> 
              <div className="hamburger-bar"></div>
              <div className="hamburger-bar"></div>
              <div className="hamburger-bar"></div>
            </div>
            <h1 className="nav-title">Popular Comedy Clubs</h1>
          </nav>
          <div className="map-sidebar">
            <input className="sidebar-input" onChange={this.updateQuery}></input>
            <ul>
              {this.state.currentPlaces.map((place) => {
                return <li>{place.name}</li>
              })}
            </ul>
          </div>
        </div>
    )
  }
}

export default MapNav;