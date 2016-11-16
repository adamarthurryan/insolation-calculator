

export function panelInput (state, action ) {
  switch (action.type) {
    case 'UPDATE_PANEL_INPUT':
      return Object.assign({}, state, action.data)
    default:
      return state || {orientation:"0", inclination:"0", tilt:"0"}
  }
}


export function locationInput (state, action) {
  switch (action.type) {
    case 'UPDATE_LOCATION_INPUT':
      return Object.assign({}, state, action.data)
    default:
      return state || {latitude:"0", longitude:"0"}  
  }
}

export function dateInput (state, action) {
  switch (action.type) {
    case 'UPDATE_DATE_INPUT':
      return action.data
    default:
      return state || "Jun 21"
  }
}

export function view (state, action) {
  switch (action.type) {
    case 'VIEW_INPUT':
      return 'INPUT'
    case 'VIEW_RESULTS':
      return 'RESULTS'
    default:
      return state || 'INPUT'
  }
}