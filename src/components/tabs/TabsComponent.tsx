import React from 'react'
import { Tab, Table, Spinner } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'
import moment from 'moment'
import Chart from '../chart/chart'
import './tabscomponent.css'



// const reactMetricsGraphics = require('react-metrics-graphics');
interface Props {
  // allData: any,
  arrayToday: ItemOfData[],
  arraySecondDay: ItemOfData[],
  arrayThirdDay: ItemOfData[],
  arrayFourDay: ItemOfData[],
  arrayFiveDay: ItemOfData[],
  loading: boolean
}
interface ItemOfData {
  description: string,
  date: string,
  id: number,
  icon: string | undefined,
  temperature: number | undefined,
  pressure: number | undefined,
  humidity: number | undefined
}
interface State{
  activeDay: string | undefined
}



export default class TabsComponent extends React.Component<Props, State>{
  state: any = {
    activeDay: moment(this.props.arrayToday[0].date).format('dddd')
  }
  changeActiveDay = (selectedTab:any) => {
    console.log(selectedTab)
    this.setState({
      activeDay: selectedTab
    })
  };

  render(){
    const { 
      arrayToday,
      arraySecondDay,
      arrayThirdDay,
      arrayFourDay,
      arrayFiveDay,
      loading } = this.props;
      const content = loading ? <Spinner animation="border" />
                              :<Tabs defaultActiveKey={moment(this.props.arrayToday[0].date).format('dddd')} id="uncontrolled-tab-example" activeKey={this.state.activeDay} onSelect={this.changeActiveDay}>
                              <Tab eventKey={moment(this.props.arrayToday[0].date).format('dddd')} title={moment(this.props.arrayToday[0].date).format('dddd')} >
                                  <Table striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Time</th>
                                      <th>Picture</th>
                                      <th>Temperature</th>
                                      <th>Pressure</th>
                                      <th>Humidity</th>
                                    </tr>
                                  </thead>
                                  <tbody> 
                                  {       
                                    this.props.arrayToday.length > 0 
                                    && this.props.arrayToday.map(data => (
                                      <tr key={data.id}>
                                        <td>{moment(data.date).format('LT')}</td>
                                        <td><img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="sunny"/></td>
                                        <td>{data.temperature}&#176;C</td>
                                        <td>{data.humidity}</td>
                                        <td>{data.pressure}</td>
                                      </tr>
                                    ))
                                  }
                                  </tbody>
                                </Table>
                                <Chart arrayToday={arrayToday} 
                                       activeDay={this.state.activeDay}
                                       />
                            </Tab>
                    
                              <Tab eventKey={moment(this.props.arraySecondDay[0].date).format('dddd')} title={moment(this.props.arraySecondDay[0].date).format('dddd')} >
                              <Table striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Time</th>
                                      <th>Picture</th>
                                      <th>Temperature</th>
                                      <th>Pressure</th>
                                      <th>Humidity</th>
                                    </tr>
                                  </thead>
                                  <tbody> 
                                  {       
                                    this.props.arraySecondDay.length > 0 
                                    && this.props.arraySecondDay.map(data => (
                                      <tr key={data.id}>
                                        <td>{moment(data.date).format('LT')}</td>
                                        <td><img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="sunny"/></td>
                                        <td>{data.temperature}&#176;C</td>
                                        <td>{data.humidity}</td>
                                        <td>{data.pressure}</td>
                                      </tr>
                                    ))
                                  }
                                  </tbody>
                                  
                                </Table>
                                <Chart arraySecondDay={arraySecondDay}
                                       activeDay={this.state.activeDay}
                                       />
                              </Tab>
                              <Tab eventKey={moment(this.props.arrayThirdDay[0].date).format('dddd')} title={moment(this.props.arrayThirdDay[0].date).format('dddd')}>
                              <Table striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Time</th>
                                      <th>Picture</th>
                                      <th>Temperature</th>
                                      <th>Pressure</th>
                                      <th>Humidity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                   {       
                                    this.props.arrayThirdDay.length > 0 
                                    && this.props.arrayThirdDay.map(data => (
                                      <tr key={data.id}>
                                        <td>{moment(data.date).format('LT')}</td>
                                        <td><img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="sunny"/></td>
                                        <td>{data.temperature}&#176;C</td>
                                        <td>{data.humidity}</td>
                                        <td>{data.pressure}</td>
                                      </tr>
                                    ))
                                  }
                                  </tbody>
                                </Table>
                                <Chart arrayThirdDay = {arrayThirdDay}
                                       activeDay={this.state.activeDay}
                                       />
                              </Tab>
                              <Tab eventKey={moment(this.props.arrayFourDay[0].date).format('dddd')} title={moment(this.props.arrayFourDay[0].date).format('dddd')}>
                              <Table striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Time</th>
                                      <th>Picture</th>
                                      <th>Temperature</th>
                                      <th>Pressure</th>
                                      <th>Humidity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                   {       
                                    this.props.arrayFourDay.length > 0 
                                    && this.props.arrayFourDay.map(data => (
                                      <tr key={data.id}>
                                        <td>{moment(data.date).format('LT')}</td>
                                        <td><img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="sunny"/></td>
                                        <td>{data.temperature}&#176;C</td>
                                        <td>{data.humidity}</td>
                                        <td>{data.pressure}</td>
                                      </tr>
                                    ))
                                  }
                                  </tbody>
                                </Table>
                                <Chart arrayFourDay={arrayFourDay}
                                       activeDay={this.state.activeDay}
                                       />
                              </Tab>
                              <Tab eventKey= {moment(this.props.arrayFiveDay[0].date).format('dddd')} title={moment(this.props.arrayFiveDay[0].date).format('dddd')}>
                              <Table striped bordered hover>
                                  <thead>
                                    <tr>
                                      <th>Time</th>
                                      <th>Picture</th>
                                      <th>Temperature</th>
                                      <th>Pressure</th>
                                      <th>Humidity</th>
                                    </tr>
                                  </thead>
                                  <tbody> 
                                  {       
                                    this.props.arrayFiveDay.length > 0 
                                    && this.props.arrayFiveDay.map(data => (
                                      <tr key={data.id}>
                                        <td>{moment(data.date).format('LT')}</td>
                                        <td><img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="sunny"/></td>
                                        <td>{data.temperature}&#176;C</td>
                                        <td>{data.humidity}</td>
                                        <td>{data.pressure}</td>
                                      </tr>
                                    ))
                                  }
                                  </tbody>
                                </Table>
                                 <Chart arrayFiveDay={arrayFiveDay}
                                        activeDay={this.state.activeDay}
                                       />
                              </Tab>
                             
                            </Tabs>
        return (
             {...content}
      )
  }

}