import React from 'react'

import {connect} from 'react-redux'
import * as Selectors from '../selectors'
import {SOLAR_CONSTANT} from '../util/insolation'


const mapStateToProps = (state) => ({
  location: Selectors.location(state), 
  date: Selectors.date(state),
  dateSunData: Selectors.dateSunData(state),
  dateResultsTable: Selectors.dateResultsTable(state),
})

const mapDispatchToProps = dispatch => ({
})

class DateResultsTable extends React.Component {
  render() { 
   return (
    <table className="u-full-width">
        <thead>
          <tr>
            <th>Time<br/>&nbsp;</th>
            <th>Sun Azimuth <br/>(deg)</th> 
            <th>Sun Altitude <br/>(deg)</th>
            <th>Panel Insolation <br/>(kWh/m<span className="sup">2</span>)</th>
            <th>Efficiency<br/>&nbsp;</th>
          </tr>
        </thead>
        <tbody>         
          {this.props.dateResultsTable.map( ({time, sunPosition, groundInsolation, panelInsolation}) => 
              <tr>
                <td>{time.format("HH:mm")}</td>
                <td>{(sunPosition.azimuth/Math.PI*180).toFixed(2)}</td>
                <td>{(sunPosition.altitude/Math.PI*180).toFixed(2)}</td>
                <td>{(panelInsolation.toFixed(3))}</td>
                <td>{(panelInsolation/SOLAR_CONSTANT*100).toFixed(1)}%</td>
              </tr>
            )}
        </tbody>
      </table>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DateResultsTable)