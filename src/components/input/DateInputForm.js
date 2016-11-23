import React from 'react'


import {connect} from 'react-redux'
import * as Actions from '../../actions'

import InputForm from './InputForm'

const inputFields = props => [

  {
    name:"Date", 
    info:"(month day)",
    id:"date",  
    onChange: (value) => { props.onChangeDateInput(value)},
    value: props.dateInput//props.date
  },
 
  
]

const mapStateToProps = (state) => ({
  dateInput: state.dateInput,
})


const mapDispatchToProps = dispatch => ({
  onChangeDateInput: data => dispatch(Actions.updateDateInput(data)),
})

let DateInputForm = (props) => <InputForm inputFields={inputFields(props)}/>

export default connect(mapStateToProps, mapDispatchToProps)(DateInputForm)