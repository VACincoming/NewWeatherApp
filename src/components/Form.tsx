import React from "react";
import WeatherLogo from '../assets/WeatherLogo.png'
import "./form.css"
import {Container, Row, Col} from 'react-bootstrap';

interface IProps {
  getWeather: any
}

export default class Form extends React.Component<IProps>{
  render(){
    return(
      <div className="wrapperForm">
        <Container>
          <Row className="justify-content-start">
            <Col xl={2}>
              <img src={WeatherLogo} alt="logo" className="logo"/>
            </Col>
            <Col xl={3}>
              <form onSubmit={this.props.getWeather}>
                <div className="form-group">
                  <input className="form-control" type="text" name="city" placeholder="City..." defaultValue="Chernihiv"></input>
                  <input className="form-control" type="text" name="country" placeholder="Country..." defaultValue="Ua"></input>
                  <button className="btn btn-primary">Get Weather</button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}