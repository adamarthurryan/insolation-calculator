//per http://redux.js.org/docs/recipes/ComputingDerivedData.html

import { createSelector } from 'reselect'
import SunCalc from 'suncalc'
import moment from 'moment'
import insolation from './util/insolation'
import {SOLAR_CONSTANT} from './util/insolation'

const getLocationInput = (state) => state.locationInput
const getDateInput = (state) => state.dateInput
const getPanelInput = (state) => state.panelInput

export const location = createSelector(
  [getLocationInput],
  (locationInput) => {
    try {
      return {latitude: parseFloat(locationInput.latitude), longitude: parseFloat(locationInput.longitude)}
    } 
    catch (error) {
      return {error}
    }
  }
)
export const date = createSelector(
  [getDateInput],
  (dateInput) => {
    try {
      let date = moment(dateInput, ["MMM D", moment.ISO_8601])
      date.hour(0)
      date.minute(0)
      date.second(0)
      date.millisecond(0)
      return date
    } 
    catch (error) {
      return {error}
    }
  }
)
export const panel = createSelector(
  [getPanelInput],
  (panelInput) => {
    try { 
      return {orientation: parseFloat(panelInput.orientation)/180*Math.PI, inclination: parseFloat(panelInput.inclination)/180*Math.PI, tilt: parseFloat(panelInput.tilt)/180*Math.PI}
    } 
    catch (error) {
      return {error}
    }
  }
)

export const inputIsValid = createSelector(
  [location, date, panel],
  (location, date, panel) => {
    let errors = [location, date, panel].filter(item => item.hasOwnProperty('error'))

    if (errors.length==0)
      return {valid: true}
    else
      return {error: "Invalid input", details: errors.map( ({error}) => error)}
  }
)

export const dateSunData = createSelector( 
  [location, date, inputIsValid],
  (location, date, inputIsValid) => {

    if (! inputIsValid.valid) {
      return inputIsValid
    }
 
    try {
      //returns an object with altitude and azimuth in radians
      // altitude from the horizon and azimuth from south to west     
      let data = {}
      let {sunrise, sunset, solarNoon} = SunCalc.getTimes(date, location.latitude, location.longitude)
      let {altitude, azimuth} = SunCalc.getPosition(solarNoon, location.latitude, location.longitude)
      let noonInsolation = insolation({altitude, azimuth}, {orientation:0, inclination:0, tilt:0})
      return {sunrise:moment(sunrise), sunset:moment(sunset), solarNoon:moment(solarNoon), noonAltitude:altitude, noonAzimuth:azimuth, noonInsolation}
    }
    catch (error) {
      return {error}
    }

  }
)

export const monthlySunData = createSelector (
  [location],
  (location) => {
    if (location.error)
      return {error: "Invalid location", details: location.error}

    let dates = []
    let date = moment("December 21, 2016", ["MMMM D, yyyy"])
    for (let i=0; i<12; i++) {
      dates.push(date)
      date = date.clone().add(1, "months")
    } 

    return dates.map(date => {
      let {sunrise, sunset, solarNoon} = SunCalc.getTimes(date, location.latitude, location.longitude)
      return { date, sunrise:moment(sunrise), sunset:moment(sunset), solarNoon:moment(solarNoon)}
    })
  }
)

export const monthlyResultsTable = createSelector (
  [inputIsValid, location, monthlySunData, panel],
  (inputIsValid, location, monthlySunData, panel) => {
    if (! inputIsValid.valid) {
      return inputIsValid
    }

    console.log(monthlySunData)
    return monthlySunData.map(dateSunData => getInsolationTable(location, dateSunData, panel))
  }
)


export const dateResultsTable = createSelector (
  [inputIsValid, location, dateSunData, panel],
  (inputIsValid, location, dateSunData, panel) => {
      
    if (! inputIsValid.valid) {
      return inputIsValid
    }

    return getInsolationTable(location, dateSunData, panel)
  }
)

const INTERVAL_MINUTES = 15
function getInsolationTable (location, sunData, panel) {
  let times = []
  let time = sunData.sunrise
  while (time.isBefore(sunData.sunset)) {
    time = time.clone()
    times.push({time})
    time.add(INTERVAL_MINUTES, "minutes")
  } 

  //insolation results in kW/m^2

  return times.map( ({time}) => { 
    let sunPosition = SunCalc.getPosition(time, location.latitude, location.longitude)
    return {
      time, 
      sunPosition,
      groundInsolation:insolation(sunPosition, {orientation:0, inclination:0, tilt:0}),
      panelInsolation:insolation(sunPosition, panel)
    }
  })
} 

function calculateInsolationTableSummary (insolationTable) {
    let capturedInsolation = insolationTable.map(({panelInsolation})=>panelInsolation).reduce((a,b) => a+b, 0)/60*INTERVAL_MINUTES
    let availableInsolation = insolationTable.length/60*INTERVAL_MINUTES * SOLAR_CONSTANT

    //results in kWh/m^2

    return {capturedInsolation, availableInsolation}  
}

export const dateResultsSummary = createSelector (
  [dateResultsTable],
  (dateResultsTable) => {
    return calculateInsolationTableSummary(dateResultsTable)
  }
)

export const monthlyResultsSummary = createSelector (
  [monthlyResultsTable],
  (monthlyResultsTable) => {
    let monthSummaries = monthlyResultsTable.map(insolationTable => Object.assign({}, calculateInsolationTableSummary(insolationTable), {date: insolationTable[0].time}))

    let yearSummary = {
      capturedInsolation: monthSummaries.map(({capturedInsolation}) => capturedInsolation).reduce((a,b)=>a+b, 0)*365/12,  
      availableInsolation: monthSummaries.map(({availableInsolation}) => availableInsolation).reduce((a,b)=>a+b, 0)*365/12  
    }

    return {monthSummaries, yearSummary}
  }
)

export const formattedDate = createSelector(
  [date],
  (date) => {
    return date.format("MMM D")
  }
)

/*
//a non-memozied selector for the state subtree the current q-value calculation depends on
const getInput = (state) => state.input

//calculate the current q-value from the state
//the result will be memoized
export const getCurrentQ = createSelector(
  [getInput],
  (input) => {
    try {
      let q = calculateQ(input)
      return {q, fractBits:input.fractBits, wholeBits:input.wholeBits}
    }
    catch (error) {
      return {error}
    }
  }
)
*/