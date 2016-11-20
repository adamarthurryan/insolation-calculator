import React from 'react'

import {connect} from 'react-redux'
import * as Selectors from '../selectors'
import {SOLAR_CONSTANT} from '../util/insolation'


const mapStateToProps = (state) => ({
  location: Selectors.location(state), 
  monthlySunData: Selectors.monthlySunData(state),
  monthlyResultsTable: Selectors.monthlyResultsTable(state),
  monthlyResultsSummary: Selectors.monthlyResultsSummary(state)
})

const mapDispatchToProps = dispatch => ({
})

class MonthlyResultsTable extends React.Component {
  render() { 
    console.log(this.props.monthlyResultsSummary)
   return (
    <table className="u-full-width">
        <thead>
          <tr>
            <th>Date<br/>&nbsp;</th>
            <th>Available Insolation <br/>(kWh/m<span className="sup">2</span>)</th> 
            <th>Panel Insolation <br/>(kWh/m<span className="sup">2</span>)</th>
            <th>Efficiency<br/>&nbsp;</th>
          </tr>
        </thead>
        <tbody>         
          {this.props.monthlyResultsSummary.monthSummaries.map( ({date, availableInsolation, capturedInsolation}) => 
              <tr>
                <td>{date.format("MMM D")}</td>
                <td>{(availableInsolation.toFixed(3))}</td>
                <td>{(capturedInsolation.toFixed(3))}</td>
                <td>{(capturedInsolation/availableInsolation*100).toFixed(1)}%</td>
              </tr>
            )}
        </tbody>
      </table>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyResultsTable)