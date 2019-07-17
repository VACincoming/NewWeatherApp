import React from 'react';
import Form from './components/Form'
import Weather from './components/Weather'
import { Container, Row, Col } from 'react-bootstrap';
import "./components/app.css"
import Particles from 'react-particles-js';
import { format } from 'date-fns'
import { string } from 'prop-types';


const API_KEY:string = 'f5795a4d5f87e58a619ac306f9d0447d';

interface IState {
  // id?: number,
  // data?: string,
  // city?: string,
  // country?: string,
  // temperature?: string,
  // humidity?: string,
  // pressure?: string,
  // clouds?: number,
  // error?: string,
  // icon?: string
  allData?: ItemOfData[]
  }

  interface ItemOfData {
    description: string,
    date: string,
  }


export default class App extends React.Component<{}, IState> {
  state: any = {
    allData: [
      {description: '1', date: '1'},
      {description: '2', date: '2'},
    ],
    // id: 0,
    // data: '',
    // pressure: '',
    // clouds: 0,
    // temperature: '',
    // city: 'Chernihiv',
    // country: '',
    // humidity: '',
    // error: '',
    // icon: ''
  }
  
  getInitWeather  = async (city:string, country:string) => {
    const api_call:any = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`)
                            .catch((err) => {
                              console.log('Could not fetch', err);
                            })
    if(!api_call.ok){
      throw new Error(`Could not fetch http://api.openweathermap.org/data/2.5/forecast?q=Chernihiv,ua&appid=${API_KEY}&units=metric , received ${api_call.status}` )
    }
    const data = await api_call.json();

    const res = data.list.map((el:any) => ({
      date: format(new Date(el.dt_txt), 'dd-MM-yyyy hh:mm'),
      description: el.weather[0].description,
    }))
    console.log(res);
    this.setState({
      ...this.state,
      allData: [
        ...this.state.allData,
       res,
      ],
    })
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
    console.log(data);
    if (city && country) {
      this.setState({
        // id: data.city.id,
        // pressure: Math.floor(data.list[0].main.pressure),
        // clouds: data.list[0].clouds.all,
        // temperature: Math.floor(data.list[0].main.temp),
        // city: data.city.name,
        // country: data.city.country,
        // humidity: Math.floor(data.list[0].main.humidity),
        // icon: data.list[0].weather[0].icon,
        // error: ""
        allData: [{
          date: format(new Date(data.list[0].dt_txt), 'dd-MM-yyyy hh:mm'),
          description: data.list[0].weather[0].description,
        }]
      });
    } else {
      this.setState({
        // id: undefined,
        // pressure: undefined,
        // clouds: undefined,
        // temperature: undefined,
        // city: undefined,
        // country: undefined,
        // humidity: undefined,
        // error: "Please enter the values."
        // icon: undefined,
        allData: [{
          date: '',
          description: '',
        }]
      });
    }
  }
  componentDidMount(){
    this.getInitWeather('Chernihiv', 'ua');
  }
  public render(){
    return (
      <div>
        {/* <Particles/>git  */}
        <Container className="mainWrapper">
          <Row className="justify-content-center align-items-center">
            <Col xl={{span:3, offset:3}}>
              <Form getWeather={this.getWeather}/>
            </Col>
            <Col xl={{span:5, offset:1}}>
              <Weather 
                // city={this.state.city!}
                // country={this.state.country!}
                // temperature={this.state.temperature!}
                // humidity={this.state.humidity!}
                // pressure={this.state.pressure!}
                // clouds={this.state.clouds!}
                // error={this.state.error!}
                // icon={this.state.icon!}
                allData={this.state.allData!}
              />
            </Col>
          </Row>
        </Container>
    </div>
    );
  }
}

