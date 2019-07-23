import React from 'react'
import './chart.css'
import moment from 'moment'


interface Props {
  arrayToday?: ItemOfData[],
  arraySecondDay?: ItemOfData[],
  arrayThirdDay?: ItemOfData[],
  arrayFourDay?: ItemOfData[],
  arrayFiveDay?: ItemOfData[],
  loading?: boolean,
  activeDay?: string | undefined
}
interface ItemOfData {
  description: string,
  date: string,
  id: number,
  icon: string | undefined,
  temperature: number | undefined,
  pressure: number | undefined,
  humidity: number | undefined
}

export default class Chart extends React.Component<Props, any>{
  state = {
    currentDay: []
  }
  componentDidMount(){
    if(this.props.arrayToday){
      if(moment(this.props.arrayToday[0].date!).format('dddd') === this.props.activeDay){
        this.draw(this.props.arrayToday);
      }
    }
  }
  componentDidUpdate(prevProps:any){
    // if(this.props.arraySecondDay.length !== 0 && prevProps.arraySecondDay !== this.props.arraySecondDay){
      if(this.props.arrayToday){
        if(moment(this.props.arrayToday[0].date!).format('dddd') === this.props.activeDay){
          this.draw(this.props.arrayToday);
        }
      }
      if(this.props.arraySecondDay){
        if(moment(this.props.arraySecondDay[0].date).format('dddd') === this.props.activeDay){
          this.draw(this.props.arraySecondDay);
        }
      }
      if(this.props.arrayThirdDay){
        if(moment(this.props.arrayThirdDay[0].date).format('dddd') === this.props.activeDay){
          this.draw(this.props.arrayThirdDay);
        }
      }
      if(this.props.arrayFourDay){
        if(moment(this.props.arrayFourDay[0].date).format('dddd') === this.props.activeDay){
          this.draw(this.props.arrayFourDay);
        }
      }if(this.props.arrayFiveDay){
        if(moment(this.props.arrayFiveDay[0].date).format('dddd') === this.props.activeDay){
          this.draw(this.props.arrayFiveDay);
        }
      }
    // }
  }
  alpha = 0.1;
  draw(data:any) {
    let maxTemp:any = []
    data.forEach((el:any) => {
        maxTemp.push(el.temperature);
    });
    console.log(Math.max(...maxTemp));
    const canvas:any = this.refs.canvas;
    if (canvas.getContext!) {
    let ctx:any = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0;i<=Math.floor((Math.max(...maxTemp))/5)+1;i++){
      ctx.font = "16px Courier"
      ctx.fillText((i)*5, 0, 250-(i*25))
      ctx.beginPath();
      ctx.moveTo(0, 250-(i*25));
      ctx.lineTo(1000, 250-(i*25));
      ctx.closePath();
      ctx.stroke();
    }

    data.forEach((el:any) => {
      if(el.temperature < 0){
        ctx.fillStyle = 'rgb(31, 120, 255)';
        ctx.fillRect((data.indexOf(el)+0.4) * 100, 250, 50, (el.temperature*5));
        
      }else{
      ctx.fillStyle = 'rgb(232, 227, 85)';
      ctx.fillRect((data.indexOf(el)+0.4) * 100, 250, 50, -(el.temperature*5));
      }
      ctx.font = "14px Courier"
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillText((moment(el.date).format("LT")),(data.indexOf(el)+0.37)*100, 270)
    });
    this.alpha+=.01;
    ctx.globalAlpha = this.alpha;
        if(this.alpha < 1)
          setTimeout(() => this.draw(data),1000/60);
    }
   
  }
  render(){
    return(
      <div className="chart">
        <canvas id="tutorial" ref="canvas" width={800} height={300}></canvas>
      </div>
    )
  }
}