import React from 'react'


import {connect} from 'react-redux'
import * as Actions from '../actions'

import InputForm from './InputForm'

const inputFields = props => [
 
  {
    name:"Panel Orentation", 
    info:"(degrees clockwise from south)",
    id:"panelOrientation", 
    onChange: (value) => props.onChangePanelInput({orientation:value}),
    value: props.panelInput.orientation
  }, 
  {
    name:"Panel Inclination", 
    info:"(degrees forward from flat)",
    id:"panelInclination", 
    onChange: (value) => props.onChangePanelInput({inclination:value}),
    value: props.panelInput.inclination
  }, 
  { 
    name:"Panel Tilt", 
    info:"(degrees left from flat)",
    id:"panelTilt",  
    onChange: (value) => props.onChangePanelInput({tilt:value}),
    value: props.panelInput.tilt
  }, 
  
]

const mapStateToProps = (state) => ({
  panelInput: state.panelInput, 
})


const mapDispatchToProps = dispatch => ({
  onChangePanelInput: data => dispatch(Actions.updatePanelInput(data)),
})

let PanelInputForm = (props) => <InputForm inputFields={inputFields(props)}/>

export default connect(mapStateToProps, mapDispatchToProps)(PanelInputForm)