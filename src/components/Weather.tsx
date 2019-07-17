import React from "react";
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
  date: string,
  icon: string
}

export default class Weather extends React.Component<Props>{
  render(){
    const {city, country, temperature, humidity, description, pressure, clouds, error, icon, date} = this.props
    return(
      <div >
        {description && <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="sunny"/>}
        {city && this.props.country && <p>Location: {city}, {country}</p>}
        {date && <p>Date: {date}</p>}
        {temperature && <p>Temperature: {temperature}&deg;C</p>}
        {humidity && <p>humidity: {humidity}%</p>}
        {description && <p>Conditions: {description}</p>}
        {pressure && <p>Pressure: {pressure}mm</p>}
        {(clouds || clouds === 0) && <p>clouds: {clouds}%</p>}
        {error && <p>{error}</p>}
      </div>
    )
  }
}