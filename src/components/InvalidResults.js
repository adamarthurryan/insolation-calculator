import React from 'react'

import {connect} from 'react-redux'
import * as Selectors from '../selectors'

const mapStateToProps = (state) => ({
  inputIsValid: Selectors.inputIsValid(state)
})


const mapDispatchToProps = dispatch => ({
})

class InvalidResults extends React.Component {
  render() {
    return <div><h2>Error</h2>
    <p>Invalid input</p>
    <pre>{JSON.stringify(inputIsValid,2)}</pre>
    </div>


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvalidResults)