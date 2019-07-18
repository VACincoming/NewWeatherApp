import React from 'react';
import Form from './components/form/Form'
import Weather from './components/weather/Weather'
import { Container, Row, Col } from 'react-bootstrap';
import "./components/app.css"
import moment from 'moment';

const API_KEY:string = 'f5795a4d5f87e58a619ac306f9d0447d';

interface IState {
  allData?: ItemOfData[]
  }

  interface ItemOfData {
    description: string,
    date: string | Date | undefined,
    id: number,
  }


export default class App extends React.Component<{}, IState> {
  state: any = {
    allData: [],
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
        date: moment(el.dt_txt).format('DD/MM hh:mm'),
        description: el.weather[0].description,
        id: el.dt
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
        }]
      });
    }
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
              <Weather
                allData={this.state.allData!}
              />
            </Col>

          </Row>
        </Container>
    </div>
    );
  }
}

