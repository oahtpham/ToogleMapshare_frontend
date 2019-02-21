const defaultState = {
  searchResults: []
}

export default function reducer(state = defaultState, action) {
  switch(action.type) {
    case "CURRENT_SEARCH_RESULTS":
      console.log('WE ARE HERE');
      console.log('action', action);
      return {...state, searchResults: action.payload}
    default:
      return state
  }
}
