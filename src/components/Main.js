
import React from 'react'
import {connect} from 'react-redux'

import * as Actions from '../actions'

import InvalidResults from './InvalidResults'
import DateResultsTable from './DateResultsTable'
import DateResultsSummary from './DateResultsSummary'
import MonthlyResultsTable from './MonthlyResultsTable'
import MonthlyResultsSummary from './MonthlyResultsSummary'
import DateInputForm from './DateInputForm'
import LocationInputForm from './LocationInputForm'
import PanelInputForm from './PanelInputForm'

import * as Selectors from '../selectors'

const mapStateToProps = (state) => ({
  view: state.view, 
  sunData: Selectors.dateSunData(state),
  inputIsValid: Selectors.inputIsValid(state),
  resultsSummary: Selectors.dateResultsSummary(state)
})

  
const mapDispatchToProps = dispatch => ({
  onViewDate: () => dispatch(Actions.viewDate()),
  onViewMonthly: () => dispatch(Actions.viewMonthly())
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
          <button className="button-primary" onClick={this.props.onViewMonthly}>Monthly Info</button>
          <button className="button-primary" onClick={this.props.onViewDate}>Date Detail</button>
      </nav>


      <div className="row">
        <div className="three columns">
          <LocationInputForm/> 
          <PanelInputForm/> 
        </div>
        <div className="nine columns">

          {this.props.view == "DATE" ? renderDate(this.props) : renderMonthly(this.props)}
          
        </div>
      </div>

      
      <div>
        <pre>sunData: <output>{JSON.stringify(this.props.sunData, null, 2)}</output></pre>
      </div>
    </div> 
  } 
}


function renderDate(props) {
  console.log("yo")
  return <div>
    <DateInputForm/> 
    <div>
      <p><strong>Data for {props.formattedDate}</strong></p>
      <DateResultsSummary/>
      <DateResultsTable/>
    </div>
  </div>
}

function renderMonthly(props) {
  return <div>
      <p><strong>Monthly Data</strong></p>
      <MonthlyResultsSummary/>
      <MonthlyResultsTable/>
    </div>
}


export default connect(mapStateToProps, mapDispatchToProps)(Main)


/*
        {this.props.view == "RESULTS" ?
          (this.props.inputIsValid.valid ?
            <div>
              <p><strong>{this.props.formattedDate}</strong></p>
              <DateResultsSummary/>
              <DateResultsTable/>
            </div> : 
            <InvalidResults/>
          ): 
*/
