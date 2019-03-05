const defaultState = {
  searchTerm: "",
  searchResults: [],
  mapLocation: [39.047695, -95.578568],
  currentUser: 1,
  openNewListForm: false,
  openNewReviewForm: false,
  openNewPinForm: false,
  successfulPinAlert: false,
  currentList: null,
  currentListPins: [],
  currentMarker: null,
  allLists: [],
  allPins: [],
  allReviews: [],
  showPins: [],
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
      return {...state, currentListPins: [...state.currentListPins, action.payload]}
    case "ADD_NEW_REVIEW" :
      return {...state, allReviews: [...state.allReviews, action.payload]}


    case "SET_ALL_PINS" :
      return {...state, allPins: action.payload}
    case "SET_ALL_REVIEWS" :
      return {...state, allReviews: action.payload}
    case "SET_SHOW_PINS" :
      return {...state, showPins: action.payload}
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

    default:
      return state
  }
}
