import React from 'react'

import {connect} from 'react-redux'
import * as Actions from '../actions'

const inputFields = props => [
  {
    name:"Latitude (fractional degrees)", 
    id:"latitude", 
    onChange: (value) => props.onChangeLocationInput({latitude:value}),
    value: props.locationInput.latitude
  }, 
  {
    name:"Longitude (fractional degrees)", 
    id:"longitude", 
    onChange: (value) => props.onChangeLocationInput({longitude:value}),
    value: props.locationInput.longitude
  }, 
  {
    name:"Date (month day)", 
    id:"date",  
    onChange: (value) => { props.onChangeDateInput(value)},
    value: props.dateInput//props.date
  },
  {
    name:"Panel Orentation (degrees clockwise from south)", 
    id:"panelOrientation", 
    onChange: (value) => props.onChangePanelInput({orientation:value}),
    value: props.panelInput.orientation
  }, 
  {
    name:"Panel Inclination (degrees forward from flat)", 
    id:"panelInclination", 
    onChange: (value) => props.onChangePanelInput({inclination:value}),
    value: props.panelInput.inclination
  }, 
  { 
    name:"Panel Tilt (degrees left from flat)", 
    id:"panelTilt",  
    onChange: (value) => props.onChangePanelInput({tilt:value}),
    value: props.panelInput.tilt
  }, 
  
]

const mapStateToProps = (state) => ({
  panelInput: state.panelInput, 
  locationInput: state.locationInput,
  dateInput: state.dateInput,
})


const mapDispatchToProps = dispatch => ({
  onChange: changeAction => dispatch(changeAction),
  onChangePanelInput: data => dispatch(Actions.updatePanelInput(data)),
  onChangeDateInput: data => dispatch(Actions.updateDateInput(data)),
  onChangeLocationInput: data => dispatch(Actions.updateLocationInput(data)),
})


class InputForm extends React.Component {
  render() {
    return <div>
      {inputFields(this.props).map(field => 
        <div key={field.id} className="row">
          <label className="one-third column" htmlFor={field.id}>{field.name}</label>
          <input 
            type="text" 
            id={field.id} 
            onChange={(event) => field.onChange(event.target.value)}
            value={field.value}></input>
        </div>
      )}
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputForm)