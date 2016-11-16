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

export const sunData = createSelector( 
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

const INTERVAL_MINUTES = 15

export const resultsTable = createSelector (
  [inputIsValid, location, sunData, panel],
  (inputIsValid, location, sunData, panel) => {
      
    if (! inputIsValid.valid) {
      return inputIsValid
    }

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
)

export const resultsSummary = createSelector (
  [resultsTable],
  (resultsTable) => {
    let capturedInsolation = resultsTable.map(({panelInsolation})=>panelInsolation).reduce((a,b) => a+b, 0)/60*INTERVAL_MINUTES
    let availableInsolation = resultsTable.length/60*INTERVAL_MINUTES * SOLAR_CONSTANT

    //results in kWh/m^2

    return {capturedInsolation, availableInsolation}
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