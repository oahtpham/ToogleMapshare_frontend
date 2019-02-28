import React from 'react'

import { Map, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet'
import L from 'leaflet';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import NewPinForm from './NewPinForm'

import NewReviewForm from './NewReviewForm'

import { connect } from 'react-redux'

const placesURL = 'http://localhost:3000/api/v1/places'
const pinsURL ='http://localhost:3000/api/v1/pinned_locations'

class MapDisplay extends React.Component {

  state = {
    showAllPins: true
  }

  componentDidMount() {
    fetch(pinsURL)
    .then(resp => resp.json())
    .then(obj => {
      this.props.setAllPins(obj)
    })
  }

  currentMarker = (location) => {
    this.props.setMarker(location)
  }

  handlePinClick = () => {
    fetch(placesURL, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        yelp_id: this.props.currentMarker.id,
        name: this.props.currentMarker.name,
        address: this.props.currentMarker.location.display_address.join(' '),
        latitude: this.props.currentMarker.coordinates.latitude,
        longitude: this.props.currentMarker.coordinates.longitude,
        img_url: this.props.currentMarker.image_url,
        yelp_url: this.props.currentMarker.url,
        yelp_rating: this.props.currentMarker.rating,
        price: this.props.currentMarker.price
      })
    })
    .then(resp => resp.json())
    .then(() => {
      fetch(pinsURL, {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          user_id: 1,
          list_id: this.props.currentList.id,
          yelp_id: this.props.currentMarker.id
        })
      })
    })
    .then()
  }

  handleReviewClick = () => {
    this.props.toggleReviewForm()
  }

  handlePinClickWithoutList = () => {
    this.props.togglePinForm()
  }

  renderAllPinnedLocations = () => {
    let greenIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
      iconSize: [18, 30],
    });
      return this.props.allPins.map(pin => {
        const position = [pin.place.latitude, pin.place.longitude]

        const rating = Math.floor(pin.place.yelp_rating)
        var i

        function checkedStars() {
          let checkedSpans = []
          for (i = 0; i < rating ; i++) {
            checkedSpans.push(<span className="fa fa-star checked"></span>)
          }
          return checkedSpans
        }

        function uncheckedStars() {
          let uncheckedSpans = []
          for (i = 0; i < (5-rating) ; i++) {
            uncheckedSpans.push(<span className="fa fa-star"></span>)
          }
          return uncheckedSpans
        }

        return (
          <div>
            <Marker onClick={() => this.currentMarker(pin)} key={pin.id} position={position} icon={greenIcon}>
            <Popup >
              <img className="locationImage" src={pin.place.img_url}/>
              <br/>
              <a href={pin.place.yelp_url} target="_blank">{pin.place.name}</a>
              <p>{pin.place.price}</p>
              {checkedStars()}
              {uncheckedStars()}
              <br/>
              <br/>
              <NewPinForm/>
              <Button onClick={this.handlePinClickWithoutList} variant="contained" color='primary' size="small" aria-label="Add">
                <AddIcon />
                 Pin
              </Button>
              <Button onClick={this.handleReviewClick} variant="contained" color="secondary" size="small" aria-label="Edit">
                <Icon>edit_icon</Icon>
                 Review
              </Button>
              </Popup>
            </Marker>
          </div>
        )
      })
  }

  renderPins = () => {
    let searchResultsIcon = new L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
      iconSize: [18, 30], // size of the icon
    });
    return this.props.searchResults.map(location => {
      const position = [location.coordinates.latitude, location.coordinates.longitude]
      const rating = Math.floor(location.rating)
      var i

      function checkedStars() {
        let checkedSpans = []
        for (i = 0; i < rating ; i++) {
          checkedSpans.push(<span className="fa fa-star checked"></span>)
        }
        return checkedSpans
      }

      function uncheckedStars() {
        let uncheckedSpans = []
        for (i = 0; i < (5-rating) ; i++) {
          uncheckedSpans.push(<span className="fa fa-star"></span>)
        }
        return uncheckedSpans
      }

      return (
        <div>
          <Marker onClick={() => this.currentMarker(location)}key={location.id} position={position} icon={searchResultsIcon}>
            <Popup >
              <img className="locationImage" src={location.image_url}/>
              <br/>
              <a href={location.url} target="_blank">{location.name}</a>
              <p>{location.price}</p>
              {checkedStars()}
              {uncheckedStars()}
              <br/>
              <br/>
              <Button onClick={this.handlePinClick} variant="contained" color='primary' size="small" aria-label="Add">
                <AddIcon />
                 Pin
              </Button>
              <Button onClick={this.handleReviewClick} variant="contained" color="secondary" size="small" aria-label="Edit">
                <Icon>edit_icon</Icon>
                 Review
              </Button>
            </Popup>
          </Marker>
        </div>
      )
    })
  }

   render() {
     console.log(this.props)
     return (
         <Map className='map' style={{marginTop: '65px', height: '91vh', width: '100%'}} center={this.props.currentList ? [this.props.currentList.latitude, this.props.currentList.longitude] : this.props.mapLocation} zoom={this.props.currentList ? 13 : this.props.mapZoom} zoomControl={false}>
           <TileLayer
             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
             url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
           />
           {this.state.showAllPins ? this.renderAllPinnedLocations() : null}
           {this.renderPins()}
           <NewReviewForm/>
           <ZoomControl position="topright"/>
         </Map>
     )
   }

}

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults,
    currentList: state.currentList,
    currentMarker: state.currentMarker,
    open: state.openNewReviewForm,
    openPinForm: state.openNewPinForm,
    mapLocation: state.mapLocation,
    mapZoom: state.mapZoom,
    allPins: state.allPins
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMarker: (payload) => {
      dispatch({type:"CURRENT_MARKER", payload: payload})
    },
    toggleReviewForm: () => {
      dispatch({type:"OPEN_NEW_REVIEW_FORM"})
    },
    togglePinForm: () => {
      dispatch({type: "OPEN_NEW_PIN_FORM"})
    },
    setAllPins: (payload) => {
      dispatch({type:"SET_ALL_PINS", payload: payload})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay);
