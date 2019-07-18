import React from "react";
import WeatherLogo from '../../assets/WeatherLogo.png'
import "./form.css"
import { Row, Col} from 'react-bootstrap';

interface IProps {
  getWeather: any
}

export default class Form extends React.Component<IProps>{
  render(){
    return(
      <Row>
        <Col>
          {/* <div className="wrapperForm"> */}
            <img src={WeatherLogo} alt="logo" className="logo"/>
            <form onSubmit={this.props.getWeather}>
              <div className="form-group">
                <input className="form-control" type="text" name="city" placeholder="City..." defaultValue="Chernihiv"></input>
                <input className="form-control" type="text" name="country" placeholder="Country..." defaultValue="Ua"></input>
                <button className="btn btn-primary">Get Weather</button>
              </div>
            </form>
          {/* </div> */}
        </Col>
      </Row>
    )
  }
}