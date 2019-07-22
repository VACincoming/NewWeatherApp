import React from "react";
import "./weather.css"
import moment from 'moment';
import TabsComponent from "../tabs/TabsComponent";
import {Spinner} from 'react-bootstrap'


const API_KEY:string = 'f5795a4d5f87e58a619ac306f9d0447d';

interface WState {
  allData: [{
    description: string | undefined; 
    date: any; 
    id: number | undefined;
    icon: string | undefined,
    temperature: number | undefined,
    pressure: number | undefined,
    humidity: number | undefined
  }],
  arrayToday: any,
  arraySecondDay: any,
  arrayThirdDay:any,
  arrayFourDay:any,
  arrayFiveDay:any,
  loading: boolean
}
export default class Weather extends React.Component<any,WState>{
  state: any = {
    allData:[],
    arrayToday: [],
    arraySecondDay: [],
    arrayThirdDay: [],
    arrayFourDay: [],
    arrayFiveDay: [],
    loading: true,
  }
  filterWeather = ((res:any) => {
    const arrayToday: any = []
    const arraySecondDay: any = []
    const arrayThirdDay: any = []
    const arrayFourDay: any = []
    const arrayFiveDay: any = []
    res.forEach((item:any) => {
      if(moment(new Date()).format('l') === moment(item.date).format('l')){
        arrayToday.push(item);
      }
      if(moment(new Date()).add(1, 'days').format('l') === moment(item.date).format('l')){
        arraySecondDay.push(item);
      }
      if(moment(new Date()).add(2, 'days').format('l') === moment(item.date).format('l')){
        arrayThirdDay.push(item);
      }
      if(moment(new Date()).add(3, 'days').format('l') === moment(item.date).format('l')){
        arrayFourDay.push(item);
      }
      if(moment(new Date()).add(4, 'days').format('l') === moment(item.date).format('l')){
        arrayFiveDay.push(item);
      }
    })
    this.setState({
      arrayToday,
      arraySecondDay,
      arrayThirdDay,
      arrayFourDay,
      arrayFiveDay,
      loading:false
    })
  }
  )
  getInitWeather  = async (city:string, country:string,filterWeather:any) => {
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
      id: el.dt,
      icon: el.weather[0].icon,
      temperature: Math.floor(el.main.temp),
      pressure: Math.floor(el.main.pressure),
      humidity: Math.floor(el.main.humidity)
    }))
    this.setState({
      allData: res
    })
    filterWeather(res)
  }
  componentDidUpdate(prevProps:any, prevState:WState){
    if(this.props.allData.length !==0 && prevProps.allData !== this.props.allData){
      this.filterWeather(this.props.allData);
    }
  }
  componentDidMount(){
    this.getInitWeather("Chernihiv", "ua", this.filterWeather);
  }

  render(){
    const {
      loading, 
      arrayToday,
      arraySecondDay,
      arrayThirdDay,
      arrayFourDay,
      arrayFiveDay } = this.state;
      
    const content = loading 
      ? <Spinner animation="border" /> 
      : <TabsComponent 
          arrayToday={arrayToday} 
          arraySecondDay={arraySecondDay}
          arrayThirdDay = {arrayThirdDay}
          arrayFourDay={arrayFourDay}
          arrayFiveDay={arrayFiveDay}
          loading = {loading}
        />
    return(
    <div>
      {content}
     </div>
    )
  }
}
