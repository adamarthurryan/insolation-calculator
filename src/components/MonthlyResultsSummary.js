import React from 'react'

import {connect} from 'react-redux'
import * as Selectors from '../selectors'
import {SOLAR_CONSTANT} from '../util/insolation'


const mapStateToProps = (state) => ({
  location: Selectors.location(state), 
  date: Selectors.date(state),
  formattedDate: Selectors.formattedDate(state),
  monthlySunData: Selectors.monthlySunData(state),
  monthlyResultsSummary: Selectors.monthlyResultsSummary(state)
})

const mapDispatchToProps = dispatch => ({
})

class MonthlyResultsSummary extends React.Component {
  render() { 
    return (
      <div>
        <p>
        <span>Available daily insolation: <strong>{this.props.monthlyResultsSummary.yearSummary.availableInsolation.toFixed(3)} kWh/m<span className="sup">2</span></strong></span>
        <br/>
        <span>Captured daily insolation: <strong>{this.props.monthlyResultsSummary.yearSummary.capturedInsolation.toFixed(3)} kWh/m<span className="sup">2</span></strong></span>
        <br/>
        <span>Efficiency: <strong>{(this.props.monthlyResultsSummary.yearSummary.capturedInsolation/this.props.monthlyResultsSummary.yearSummary.availableInsolation*100).toFixed(1)}%</strong></span>
        </p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyResultsSummary)