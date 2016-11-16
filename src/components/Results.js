import React from 'react'

import {connect} from 'react-redux'
import * as Selectors from '../selectors'
import {SOLAR_CONSTANT} from '../util/insolation'


const mapStateToProps = (state) => ({
  location: Selectors.location(state), 
  date: Selectors.date(state),
  formattedDate: Selectors.formattedDate(state),
  sunData: Selectors.sunData(state),
  resultsTable: Selectors.resultsTable(state),
  resultsSummary: Selectors.resultsSummary(state)
})

const mapDispatchToProps = dispatch => ({
})

class Results extends React.Component {
  render() { 
   return <div>
    <p><strong>{this.props.formattedDate}</strong></p>
    <div>
      <p>
      <span>Available daily insolation: <strong>{this.props.resultsSummary.availableInsolation.toFixed(3)} kWh/m<span className="sup">2</span></strong></span>
      <br/>
      <span>Captured daily insolation: <strong>{this.props.resultsSummary.capturedInsolation.toFixed(3)} kWh/m<span className="sup">2</span></strong></span>
      <br/>
      <span>Efficiency: <strong>{(this.props.resultsSummary.capturedInsolation/this.props.resultsSummary.availableInsolation*100).toFixed(1)}%</strong></span>
      </p>
    </div>

      <table className="u-full-width">
        <thead>
          <tr>
            <th>Time</th>
            <th>Sun Azimuth (deg)</th> 
            <th>Sun Altitude (deg)</th>
            <th>Panel Insolation (kWh/m^2)</th>
            <th>Efficiency</th>
          </tr>
        </thead>
        <tbody>         
          {this.props.resultsTable.map( ({time, sunPosition, groundInsolation, panelInsolation}) => 
              <tr>
                <td>{time.format("hh:mm")}</td>
                <td>{(sunPosition.azimuth/Math.PI*180).toFixed(2)}</td>
                <td>{(sunPosition.altitude/Math.PI*180).toFixed(2)}</td>
                <td>{(panelInsolation.toFixed(3))}</td>
                <td>{(panelInsolation/SOLAR_CONSTANT*100).toFixed(1)}%</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Results)