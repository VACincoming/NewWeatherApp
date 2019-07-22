import React from 'react';
import Form from './components/form/Form'
import { Container, Row, Col } from 'react-bootstrap';
import "./components/app.css"
import moment from 'moment';
// import {Spinner} from 'react-bootstrap'
import Weather from './components/weather/Weather'

const API_KEY:string = 'f5795a4d5f87e58a619ac306f9d0447d';

interface IState {
  allData?: ItemOfData[],
  loading?: boolean
  }

  interface ItemOfData {
    description: string,
    date: string | Date | undefined,
    id: number,
    icon: string | undefined,
    temperature: number | undefined,
    pressure: number | undefined,
    humidity: number | undefined
  }


export default class App extends React.Component<any,IState> {
  state: any = {
    allData: [],
    loading: true,
  }
  
  getWeather = async (e?: any) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call:any = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`)
      .catch((err) => {
        console.log('Could not fetch', err);
    })

    if(!api_call.ok){
      throw new Error(`Could not fetch http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric , received ${api_call.status}` )
    }
    
    const data = await api_call.json();

    const res = data.list.map((el:any) => ({
      date: moment(el.dt_txt).format('l LT'),
      description: el.weather[0].description,
      id: el.dt,
      icon: el.weather[0].icon,
      temperature: Math.floor(el.main.temp),
      pressure: Math.floor(el.main.pressure),
      humidity: Math.floor(el.main.humidity)
    }))
    this.setState({
      allData: res
    })

    if (city && country) {
      this.setState({
          allData: res
      });
    } else {
      this.setState({
        allData: [{
          date: '',
          description: '',
          id: 0,
          icon: '',
          temperature: 0,
          pressure: 0,
          humidity: 0
        }]
      });
    }
  }
  isLoading = () => {
    this.setState({
      ...this.state,
      loading: false,
    })
  }
  public render(){
    return (
      <div>
        <Container className="mainWrapper">
          <Row className="justify-content-center align-items-start">
            <Col xl={{span:3}}>
              <Form getWeather={this.getWeather}/>
            </Col>
            <Col xl={{span:9}}>
                <Weather allData={this.state.allData}/>
            </Col>

          </Row>
        </Container>
    </div>
    );
  }
}

