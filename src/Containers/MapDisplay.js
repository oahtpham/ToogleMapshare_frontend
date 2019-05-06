import React from 'react'
import { connect } from 'react-redux'
import PinDetailsContainer from './PinDetailsContainer'

//leaflet API
import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet';

import StarRatings from 'react-star-ratings'


const pinsURL ='https://tooglemapshare-app-api.herokuapp.com/api/v1/pinned_locations'
const reviewsURL = 'https://tooglemapshare-app-api.herokuapp.com/api/v1/reviews'
const searchUrl = 'https://tooglemapshare-app-api.herokuapp.com/api/v1/yelp'

const redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [18, 30],
});
const blueIcon = new L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
  iconSize: [18, 30], // size of the icon
});
const greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [18, 30],
});

class MapDisplay extends React.Component {

  state = {
    showAllPins: true,
  }

  // Page initializes with full pins and reviews info //
  // Data is stored in reducer //

  componentDidMount() {
    fetch(pinsURL)
    .then(resp => resp.json())
    .then(obj => {
      this.props.setAllPins(obj)
      const friendsPins = obj.filter(pin => pin.user.id !== this.props.currentUser)
      const userPins = obj.filter(pin => pin.user.id === this.props.currentUser)
      this.props.setFriendsPins(friendsPins)
      this.props.setUserPins(userPins)
    })
    .then(() => {
      fetch(reviewsURL)
      .then(resp => resp.json())
      .then(obj => {
        this.props.setAllReviews(obj)
      })
    })
  }



  fetchSearchResults = () => {
    fetch(searchUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        searchTerm: this.props.searchTerm,
        searchLocation: this.props.currentList.location_area
      })
    })
    .then(response => response.json())
    .then(obj => {
      this.props.setResults(obj)
    })
  }

  // displays pin information onClick //

  showCurrentMarkerInfo = (location) => {
    if (this.props.currentList) { // info pulled from Yelp API
      console.log(location);
      this.props.setSearchTerm(location.place.name)
      this.fetchSearchResults()
      this.props.setMarker(location)
    } else { //info pulled from data persisted in DB
    this.props.showMarkerDisplay()
    this.props.setMarker(location)
    }
  }

  hideCurrentMarkerInfo = () => {
    this.props.hideMarkerDisplay()
    this.props.setMarker(null)
    this.props.setResults([])
  }

  //displays cards for top 15 search results from Yelp
  displaySearchResults = () => {
    if (this.props.currentMarker) {
    // pins from homepage displayed here.. uses info persisted in DB //
      return this.props.searchResults.filter(result => result.id === this.props.currentMarker.place.yelp_id)
    } else if (this.props.searchCard){
    // pin info comes from Yelp API search instead of info from DB //
      return this.props.searchResults.filter(result => result.id === this.props.searchCard.id)
    } else {
    // ALL SEARCH RESULTS ARE RENDERED //
    return this.props.searchResults
    }
  }

  //////// FUNCTIONS TO RENDER PINS BASED ON TYPES ////////

  renderFriendsPinnedLocations = () => {
      return this.props.friendsPins.map(pin => {
        const position = [pin.place.latitude, pin.place.longitude]
        return (
          <div>
            <Marker
              key={pin.id}
              onClick={() => this.showCurrentMarkerInfo(pin)}
              onMouseOver={(e) => e.target.openPopup()}
              onMouseOut={(e) => e.target.closePopup()}
              position={position}
              icon={redIcon}>
              <Popup>
                {pin.place.img_url ? <img alt="location" className="locationImage" src={ pin.place.img_url}/> : null}
                <br/>
                <h3>{pin.place.name}</h3>
                <p>{pin.place.address}<br/>
                {pin.place.city}, {pin.place.state} {pin.place.zip_code}</p>
                <StarRatings
                 rating={pin.place.yelp_rating}
                 starRatedColor="orange"
                 numberOfStars={5}
                 starDimension="12px"
                 starSpacing="1px"
                 name='rating'
               />
              <br/>
              </Popup>
            </Marker>
          </div>
        )
      })
  }

  renderUserPinnedLocations = () => {
      return this.props.userPins.map(pin => {
        const position = [pin.place.latitude, pin.place.longitude]
        return (
          <div>
            <Marker
              key={pin.id}
              onClick={() => this.showCurrentMarkerInfo(pin)}
              onMouseOver={(e) => e.target.openPopup()}
              onMouseOut={(e) => e.target.closePopup()}
              position={position}
              icon={greenIcon }>
              <Popup>
                {pin.place.img_url ? <img alt="location" className="locationImage" src={ pin.place.img_url}/> : null}
                <br/>
                <h3>{pin.place.name}</h3>
                <p>{pin.place.address}<br/>
                {pin.place.city}, {pin.place.state} {pin.place.zip_code}</p>
                <StarRatings
                 rating={pin.place.yelp_rating}
                 starRatedColor="orange"
                 numberOfStars={5}
                 starDimension="12px"
                 starSpacing="1px"
                 name='rating'
               />
              <br/>
              </Popup>
            </Marker>
          </div>
        )
      })
  }

  renderSearchPins = () => {
    return this.displaySearchResults().map(location => {
      const position = [location.coordinates.latitude, location.coordinates.longitude]
      return (
        <div>
          <Marker
            onMouseOver={(e) => e.target.openPopup()}
            onMouseOut={(e) => e.target.closePopup()}
            key={location.id}
            position={position}
            icon={this.props.currentListPins.filter(pin => pin.place.yelp_id === location.id).length === 0 ? blueIcon : greenIcon}>
            <Popup >
              <img alt="location" className="locationImage" src={location.image_url}/>
              <br/>
              <h3>{location.name}</h3>
              <p>{location.location.address1}<br/>
              {location.location.city}, {location.location.state} {location.location.zip_code}</p>
              <StarRatings
               rating={location.rating}
               starRatedColor="orange"
               numberOfStars={5}
               starDimension="12px"
               starSpacing="1px"
               name='rating'
              />
              <br/>
            </Popup>
          </Marker>
        </div>
      )
    })
  }

  showCurrentListPins = () => {
    if(this.props.currentList) {
      let greenIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        iconSize: [18, 30],
      });
      return this.props.currentListPins.map(pin => {
        const position = [pin.place.latitude, pin.place.longitude]
        return (
          <div>
            <Marker
              onClick={() => this.showCurrentMarkerInfo(pin)}
              onMouseOver={(e) => e.target.openPopup()}
              onMouseOut={(e) => e.target.closePopup()}
              key={pin.id}
              position={position}
              icon={greenIcon}>
              <Popup >
                <img alt="location" className="locationImage" src={pin.place.img_url}/>
                <br/>
                <h3>{pin.place.name}</h3>
                <p>{pin.place.address}<br/>
                {pin.place.city}, {pin.place.state} {pin.place.zip_code}</p>
                <StarRatings
                 rating={pin.place.yelp_rating}
                 starRatedColor="orange"
                 numberOfStars={5}
                 starDimension="12px"
                 starSpacing="1px"
                 name='rating'
               />
                <br/>
              </Popup>
            </Marker>
          </div>
        )
      })
    }
  }

   render() {
     return (
        <div>
          <div className="pinsContainer">
            {this.props.currentMarker && !this.props.currentList ? <PinDetailsContainer/> : null}
          </div>
           <Map
            onClick={this.hideCurrentMarkerInfo}
            className='map'
            style={{marginTop: '65px', height: '91vh', width: '100%'}} center={this.props.mapLocation}
            zoom={this.props.mapZoom}
            zoomControl={false}>
             <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
               url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
             />
             {this.renderFriendsPinnedLocations()}
             {this.props.currentList ? this.showCurrentListPins() : this.renderUserPinnedLocations()}
             {this.props.searchTerm === "" ? null : this.renderSearchPins()}
             <ZoomControl position="topright"/>
           </Map>
         </div>
     )
   }

} //end of MapDisplayComponent


// REDUX STATES AND DISPATCHES //

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults,
    searchTerm: state.searchTerm,
    currentList: state.currentList,
    currentMarker: state.currentMarker,
    currentListPins: state.currentListPins,
    currentUser: state.currentUser,
    open: state.openNewReviewForm,
    mapLocation: state.mapLocation,
    mapZoom: state.mapZoom,
    allPins: state.allPins,
    friendsPins: state.friendsPins,
    userPins: state.userPins,
    allReviews: state.allReviews,
    markerDetailsDisplay: state.markerDetailsDisplay,
    searchCard: state.searchCard
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMarker: (payload) => {
      dispatch({type:"CURRENT_MARKER", payload: payload})
    },
    setAllPins: (payload) => {
      dispatch({type:"SET_ALL_PINS", payload: payload})
    },
    setAllReviews: (payload) => {
      dispatch({type:"SET_ALL_REVIEWS", payload: payload})
    },
    showMarkerDisplay: () => {
      dispatch({type: "DISPLAY_MARKER_ON"})
    },
    hideMarkerDisplay: () => {
      dispatch({type: "DISPLAY_MARKER_OFF"})
    },
    setResults: (payload) => {
      dispatch({type: 'CURRENT_SEARCH_RESULTS', payload: payload})
    },
    setSearchTerm: (payload) => {
      dispatch({type: 'SET_SEARCH_TERM', payload: payload})
    },
    setFriendsPins: (payload) => {
      dispatch({type: 'SET_FRIENDS_PINS', payload: payload})
    },
    setUserPins: (payload) => {
      dispatch({type: 'SET_USER_PINS', payload: payload})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay);
