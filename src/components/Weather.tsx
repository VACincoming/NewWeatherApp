import React from "react";
import "./weather.css"


interface Props {
  // city: string,
  // country: string,
  // temperature: string,
  // humidity: string,
  // pressure: string,
  // clouds: number,
  // error: string,
  // icon: string
  allData: [{
    description: string | undefined; 
    date: string | undefined; }];
}
// city, country, temperature, humidity, description, pressure, clouds, error, icon, 
export default class Weather extends React.Component<Props>{
  render(){
    const {allData} = this.props;
    return(
      <div>
        {
          allData.forEach((el:any) => {
          <p>{el.date}</p>
        })
        }
        {/* <p>{date}</p> */}
      {/* <p>{description}</p> */}
        {/* {allDate.date && <p>Date: {allDate.date}</p>} */}
        {/* {description && <p>Conditions: {description}</p>} */}
        {/* {description && <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="sunny"/>} */}
        {/* {city && this.props.country && <p>Location: {city}, {country}</p>} */}
        {/* {temperature && <p>Temperature: {temperature}&deg;C</p>}
        {humidity && <p>humidity: {humidity}%</p>}
       
        {pressure && <p>Pressure: {pressure}mm</p>}
        {(clouds || clouds === 0) && <p>clouds: {clouds}%</p>}
        {error && <p>{error}</p>} */}
      </div>
    )
  }
}