import React from 'react'


import {connect} from 'react-redux'
import * as Actions from '../actions'

import InputForm from './InputForm'

const inputFields = props => [
  {
    name:"Latitude", 
    info:"(fractional degrees)",
    id:"latitude", 
    onChange: (value) => props.onChangeLocationInput({latitude:value}),
    value: props.locationInput.latitude
  }, 
  {
    name:"Longitude", 
    info:"(fractional degrees)",
    id:"longitude", 
    onChange: (value) => props.onChangeLocationInput({longitude:value}),
    value: props.locationInput.longitude
  },  
]

const mapStateToProps = (state) => ({
  locationInput: state.locationInput,
})


const mapDispatchToProps = dispatch => ({
  onChangeLocationInput: data => dispatch(Actions.updateLocationInput(data)),
})

let LocationInputForm = (props) => <InputForm inputFields={inputFields(props)}/>

export default connect(mapStateToProps, mapDispatchToProps)(LocationInputForm)