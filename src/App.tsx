import React from 'react';
import Form from './components/Form'
import Weather from './components/Weather'
import { Container, Row, Col } from 'react-bootstrap';
import "./components/app.css"
import Particles from 'react-particles-js';
import { format } from 'date-fns'


const API_KEY:string = 'f5795a4d5f87e58a619ac306f9d0447d';

interface IState{
  id?: number,
  data?: string,
  city?: string,
  country?: string,
  temperature?: string,
  humidity?: string,
  pressure?: string,
  description?: string,
  clouds?: number,
  error?: string,
  date?: string,
  icon?: string
}

export default class App extends React.Component<IState> {
  state: IState = {
    id: 0,
    data: '',
    pressure: '',
    clouds: 0,
    temperature: '',
    city: 'Chernihiv',
    country: '',
    humidity: '',
    description: '',
    error: '',
    date: '',
    icon: ''
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
    console.log(data);
      this.setState({
        id: data.city.id,
        pressure: Math.floor(data.list[0].main.pressure),
        clouds: data.list[0].clouds.all,
        temperature: Math.floor(data.list[0].main.temp),
        city: data.city.name,
        country: data.city.country,
        humidity: Math.floor(data.list[0].main.humidity),
        description: data.list[0].weather[0].description,
        icon: data.list[0].weather[0].icon,
        date: format(new Date(data.list[0].dt_txt), 'dd-MM-yyyy hh:mm'),
        error: ""
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
        id: data.city.id,
        pressure: Math.floor(data.list[0].main.pressure),
        clouds: data.list[0].clouds.all,
        temperature: Math.floor(data.list[0].main.temp),
        city: data.city.name,
        country: data.city.country,
        humidity: Math.floor(data.list[0].main.humidity),
        description: data.list[0].weather[0].description,
        icon: data.list[0].weather[0].icon,
        date: format(new Date(data.list[0].dt_txt), 'dd-MM-yyyy hh:mm'),
        error: ""
      });
    } else {
      this.setState({
        id: undefined,
        pressure: undefined,
        clouds: undefined,
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        date: undefined,
        error: "Please enter the values."
      });
    }
  }
  componentDidMount(){
    this.getInitWeather('Chernihiv', 'ua');
  }
  public render(){
    return (
      <div>
        {/* <Particles/> */}
        <Container className="mainWrapper">
          <Row className="justify-content-center align-items-center">
            <Col xl={{span:3, offset:3}}>
              <Form getWeather={this.getWeather}/>
            </Col>
            <Col xl={{span:5, offset:1}}>
              <Weather 
                city={this.state.city!}
                country={this.state.country!}
                temperature={this.state.temperature!}
                humidity={this.state.humidity!}
                description={this.state.description!}
                pressure={this.state.pressure!}
                clouds={this.state.clouds!}
                error={this.state.error!}
                date={this.state.date!}
                icon={this.state.icon!}
              />
            </Col>
          </Row>
        </Container>
    </div>
    );
  }
}

