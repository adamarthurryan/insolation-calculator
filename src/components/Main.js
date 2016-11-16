
import React from 'react'
import {connect} from 'react-redux'

import * as Actions from '../actions'

import InvalidResults from './InvalidResults'
import Results from './Results'
import InputForm from './InputForm'

import * as Selectors from '../selectors'

const mapStateToProps = (state) => ({
  view: state.view, 
  sunData: Selectors.sunData(state),
  inputIsValid: Selectors.inputIsValid(state),
  resultsSummary: Selectors.resultsSummary(state)
})

  
const mapDispatchToProps = dispatch => ({
  onViewInput: () => dispatch(Actions.viewInput()),
  onViewResults: () => dispatch(Actions.viewResults())
})


class Main extends React.Component {
  
  constructor() {
    super()

  }

  handleViewSwitch() {

  }

  handleViewResults() {

  }

  render () { 
    return <div className="container">
      <section className="header">
        <h2 className="title">Insolation Calculator</h2>
      </section>

      <nav >
          <button className="button-primary" onClick={this.props.onViewInput}>Parameters</button>
          <button className="button-primary" onClick={this.props.onViewResults}>Daily Detail</button>
      </nav>

      {this.props.view == "RESULTS" ?
        (this.props.inputIsValid.valid ?
          <Results/> : 
          <InvalidResults/>
        ): 
        <InputForm/> 
      }
      
      <div>
        <p>Available daily insolation: <strong>{this.props.resultsSummary.availableInsolation.toFixed(3)} kWh/m^<span className="sup">2</span></strong></p>
        <p>Captured daily insolation: <strong>{this.props.resultsSummary.capturedInsolation.toFixed(3)} kWh/m^<span className="sup">2</span></strong></p>
        <p>Efficiency: <strong>{(this.props.resultsSummary.capturedInsolation/this.props.resultsSummary.availableInsolation*100).toFixed(1)}%</strong></p>
      </div>
      <div>
        <pre>sunData: <output>{JSON.stringify(this.props.sunData, null, 2)}</output></pre>
      </div>
    </div> 
  } 
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)