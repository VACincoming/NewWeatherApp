import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./weather.css"


interface Props {
  city: string,
  country: string,
  temperature: string,
  humidity: string,
  description: string,
  pressure: string,
  clouds: number,
  error: string,
  icon: string
}

export default class Weather extends React.Component<Props>{
  render(){
    const {city, country, temperature, humidity, description, pressure, clouds, error, icon} = this.props
    return(
      <div >
        <Container>
          <Row className="justify-content-start">
            <Col xl={{span:6, offset:0}}>
              <div className="wrapperWeather">
                {description && <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="sunny"/>}
                {city && this.props.country && <p>Location: {city}, {country}</p>}
                {temperature && <p>Temperature: {temperature}&deg;C</p>}
                {humidity && <p>humidity: {humidity}%</p>}
                {description && <p>Conditions: {description}</p>}
                {pressure && <p>Pressure: {pressure}mm</p>}
                {(clouds || clouds === 0) && <p>clouds: {clouds}%</p>}
                {error && <p>{error}</p>}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}