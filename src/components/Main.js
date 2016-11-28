
import React from 'react'
import {connect} from 'react-redux'

import {Menu, Header, Segment, Grid, Rail, Container} from 'semantic-ui-react'

import * as Actions from '../actions'

import InvalidResults from './InvalidResults'

import DateResultsChart from './DateResultsChart'
import MonthlyResultsChart from './MonthlyResultsChart'

import DateResultsTable from './DateResultsTable'
import DateResultsSummary from './DateResultsSummary'
import MonthlyResultsTable from './MonthlyResultsTable'
import MonthlyResultsSummary from './MonthlyResultsSummary'

import DateInputForm from './input/DateInputForm'
import LocationInputForm from './input/LocationInputForm'
import PanelInputForm from './input/PanelInputForm'

import * as Selectors from '../selectors'

const mapStateToProps = (state) => ({
  view: state.view, 
  formattedDate: Selectors.formattedDate(state),
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
    return <div>
      
      <Segment vertical padded textAlign="center" as="header" id='masthead'>
        <Header>Insolation Calculator</Header>
      </Segment>


      <Segment vertical padded>
            <Grid centered columns={2}>
              <Grid.Column>
                <Menu tabular attached='top'>
                  <Menu.Item active={this.props.view=="MONTHLY"} onClick={this.props.onViewMonthly}>Monthly Info</Menu.Item>
                  <Menu.Item active={this.props.view=="DATE"} onClick={this.props.onViewDate}>Date Detail</Menu.Item>
                </Menu>
                <Segment attached='bottom'>
                  {this.props.view == "DATE" ? renderDate(this.props) : renderMonthly(this.props)}
                
                  <Rail close position='left'>
                    <Segment textAlign="left">
                      <LocationInputForm/> 
                      <PanelInputForm/> 
                    </Segment>
                  </Rail>
                </Segment>
              </Grid.Column>
            </Grid>
      </Segment>

      <Segment vertical padded textAlign="center" as="footer">
          <p><a href="http://adamarthurryan.com">Adam Brown</a> | This website is <a href="https://github.com/adamarthurryan/insolation-calculator">open source</a>.</p>
      </Segment>


    </div> 
  } 
}


function renderDate(props) {
  return <div>
    <DateInputForm/> 
    <Header>Data for {props.formattedDate}</Header>
    <DateResultsSummary/>
    <DateResultsChart/>
  </div>
}

function renderMonthly(props) {
  return <div>
      <Header>Yearly Data</Header>
      <MonthlyResultsSummary/>
      <MonthlyResultsChart/>
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
