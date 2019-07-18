import React from "react";
import "./weather.css"
// import { ListGroup, ListGroupItem } from 'react-bootstrap';
// import TabsComponent from '../tabs/TabsComponent'
import moment from 'moment';
import TabsComponent from '../tabs/TabsComponent'

const API_KEY:string = 'f5795a4d5f87e58a619ac306f9d0447d';

interface State {
  allData: [{
    description: string | undefined; 
    date: any; 
    id: number | undefined;
  }]
}
export default class Weather extends React.Component<State>{
  state: any = {
    allData:[],
  }
  arrayToday:any = [];
  arrayThreeDays:any = [];
  arrayFiveDays:any = [];
  
  getInitWeather  = async (city:string, country:string) => {
    console.log('init 1')
    const api_call:any = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`)
                            .catch((err) => {
                              console.log('Could not fetch', err);
                            })
    if(!api_call.ok){
      throw new Error(`Could not fetch http://api.openweathermap.org/data/2.5/forecast?q=Chernihiv,ua&appid=${API_KEY}&units=metric , received ${api_call.status}` )
    }
    const data = await api_call.json();
    const res = await data.list.map((el:any) => ({
      date: moment(el.dt_txt).format('l LT'),
      description: el.weather[0].description,
      id: el.dt
    }))
    await console.log(res);
    this.setState({
      allData: res
    })
    await console.log('init 2')
  }

  filterWeather = () => {
    this.state.allData.forEach((item:any) => {
      // console.log(moment(item.date).format('l'))
      if(moment(new Date()).format('l') === moment(item.date).format('l')){
        this.arrayToday.push(item);
      }
      if(moment(new Date()).add(3, 'days').format('l') >= moment(item.date).format('l')){
        this.arrayThreeDays.push(item);
      }
      if(moment(new Date()).add(5, 'days').format('l') >= moment(item.date).format('l')){
        this.arrayFiveDays.push(item);
      }
      // console.log(this.arrayToday);
    });
  }
  async componentDidMount(){
    await this.getInitWeather("Chernihiv", "ua");
    await this.filterWeather();
  }
  render(){
    return(
     <TabsComponent arrayToday={this.arrayToday} arrayThreeDays={this.arrayThreeDays} arrayFiveDays={this.arrayFiveDays}/>
    )
  }
}
