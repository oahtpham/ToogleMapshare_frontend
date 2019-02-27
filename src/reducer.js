const defaultState = {
  searchResults: [],
  currentUser: 1,
  openNewListForm: false,
  openNewReviewForm: false,
  currentList: null,
  currentMarker: null
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "CURRENT_SEARCH_RESULTS":
      return {...state, searchResults: action.payload}
    case "CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "OPEN_NEW_LIST_FORM" :
      return {...state, openNewListForm: !state.openNewListForm}
    case "OPEN_NEW_REVIEW_FORM" :
      return {...state, openNewReviewForm: !state.openNewReviewForm}
    case "CURRENT_LIST" :
      return {...state, currentList: action.payload}
    case "CURRENT_MARKER" :
      return {...state, currentMarker: action.payload}
    default:
      return state
  }
}
