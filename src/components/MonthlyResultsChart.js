import React from 'react'

import {connect} from 'react-redux'
import * as Selectors from '../selectors'
import {SOLAR_CONSTANT} from '../util/insolation'

import Chart from 'chart.js'

Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0
    }
})

const mapStateToProps = (state) => ({
  location: Selectors.location(state), 
  monthlyResultsSummary: Selectors.monthlyResultsSummary(state),
})

const mapDispatchToProps = dispatch => ({
})

class MonthlyResultsChart extends React.Component {

  componentDidMount() {
    var chart = new Chart(this.canvasElement, {
      type: 'bar',
      data: renderChartData(this.props.monthlyResultsSummary),

      options: {
        maintainAspectRatio: true
      }
    })
    this.chart = chart
  }

  componentWillUnmount() {
    this.chart.destroy()
  }

  componentWillReceiveProps(newProps) {
    this.chart.config.data = renderChartData(newProps.monthlyResultsSummary)
    this.chart.update()
  }

  render() { 
    return <canvas ref={element => this.canvasElement = element}></canvas>
  }

}

function renderChartData(monthlyResultsSummary) {
  return {
    labels: monthlyResultsSummary.monthSummaries.map(({date})=>date.format("MMM D")),
    datasets: [ {
      label: "Captured Insolation",
      data: monthlyResultsSummary.monthSummaries.map(({capturedInsolation})=>capturedInsolation),
      backgroundColor: "rgba(64,64,255,.5)", 
      //borderWidth: 5,
      //borderColor: "rgba(128, 128, 255, .75)"
    }, {
      label: "Available Insolation",
      data: monthlyResultsSummary.monthSummaries.map(({availableInsolation})=>availableInsolation),
      backgroundColor: "rgba(255,255,128,.75)", 
      borderWidth: 2,
      borderColor: "rgba(255,255,64, .75)"
    } ]
  }    
}

/*
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
  */

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyResultsChart)