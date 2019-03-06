const defaultState = {
  searchTerm: "",
  searchResults: [],
  mapLocation: [39.047695, -95.578568],
  currentUser: 1,
  openNewListForm: false,
  openNewReviewForm: false,
  openNewPinForm: false,
  successfulPinAlert: false,
  markerDetailsDisplay: false,
  searchCard: null,
  currentList: null,
  currentListPins: [],
  currentMarker: null,
  allLists: [],
  allPins: [],
  allReviews: [],
  userPins: [],
  friendsPins: [],
  mapZoom: 5,
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "CURRENT_LIST" :
      return {...state, currentList: action.payload}
    case "CURRENT_LIST_PINS" :
      return {...state, currentListPins: action.payload}
    case "CURRENT_MARKER" :
      return {...state, currentMarker: action.payload}

    case "CURRENT_SEARCH_RESULTS":
      return {...state, searchResults: action.payload}
    case "SET_ALL_LISTS" :
      return {...state, allLists: action.payload}
    case "ADD_NEW_LIST" :
      return {...state, allLists: [...state.allLists, action.payload]}
    case "ADD_NEW_PIN" :
      return {...state, currentListPins: [...state.currentListPins, action.payload], allPins: [...state.allPins, action.payload], userPins: [...state.userPins, action.payload]}
    case "ADD_NEW_REVIEW" :
      return {...state, allReviews: [...state.allReviews, action.payload]}
    case "ADD_SEARCH_CARD" :
      return {...state, searchCard: action.payload}


    case "SET_ALL_PINS" :
      return {...state, allPins: action.payload}
    case "SET_FRIENDS_PINS" :
      return {...state, friendsPins: action.payload}
    case "SET_USER_PINS" :
      return {...state, userPins: action.payload}
    case "SET_ALL_REVIEWS" :
      return {...state, allReviews: action.payload}
    case "SET_MAP_LOCATION" :
      return {...state, mapLocation: action.payload.mapLocation, mapZoom: action.payload.mapZoom}
    case "SET_SEARCH_TERM" :
      return {...state, searchTerm: action.payload}

    case "OPEN_NEW_LIST_FORM" :
      return {...state, openNewListForm: !state.openNewListForm}
    case "OPEN_NEW_REVIEW_FORM" :
      return {...state, openNewReviewForm: !state.openNewReviewForm}
    case "OPEN_NEW_PIN_FORM" :
      return {...state, openNewPinForm: !state.openNewPinForm}
    case "OPEN_SUCCESSFUL_PIN_ALERT" :
      return {...state, successfulPinAlert: !state.successfulPinAlert}
    case "DISPLAY_MARKER_ON" :
      return {...state, markerDetailsDisplay: true}
    case "DISPLAY_MARKER_OFF" :
      return {...state, markerDetailsDisplay: false}
    case "CLEAR_LIST" :
      return {...state, currentList: null}

    default:
      return state
  }
}
