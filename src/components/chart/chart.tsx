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
  oldDay:ItemOfData[] = [];
  componentDidMount(){
    if(this.props.arrayToday){
      if(moment(this.props.arrayToday[0].date!).format('dddd') === this.props.activeDay){
        this.draw(this.props.arrayToday);
      }
    }
  }
  componentDidUpdate(prevProps:any){
    // if(prevProps.arrayToday !== this.props.arrayToday && prevProps.arraySecondDay !== this.props.arraySecondDay){
      if(this.props.arrayToday){
        if(moment(this.props.arrayToday[0].date!).format('dddd') === this.props.activeDay){
          this.draw(this.props.arrayToday);
          this.oldDay = this.props.arrayToday;
        }
      }
      if(this.props.arraySecondDay){
        if(moment(this.props.arraySecondDay[0].date).format('dddd') === this.props.activeDay){
          this.draw(this.props.arraySecondDay);
          this.oldDay = this.props.arraySecondDay;
        }
      }
      if(this.props.arrayThirdDay){
        if(moment(this.props.arrayThirdDay[0].date).format('dddd') === this.props.activeDay){
          this.draw(this.props.arrayThirdDay);
          this.oldDay = this.props.arrayThirdDay;
        }
      }
      if(this.props.arrayFourDay){
        if(moment(this.props.arrayFourDay[0].date).format('dddd') === this.props.activeDay){
          this.draw(this.props.arrayFourDay);
          this.oldDay = this.props.arrayFourDay;
        }
      }
      if(this.props.arrayFiveDay){
        if(moment(this.props.arrayFiveDay[0].date).format('dddd') === this.props.activeDay){
          this.draw(this.props.arrayFiveDay);
          this.oldDay = this.props.arrayFiveDay;
        }
      }
    // }
  }
  draw(data:any) {
    if(this.oldDay !== data){
      let temp:any = []
      data.forEach((el:any) => {
        if(el.temperature >= 0){
          temp.push(el.temperature);
        }else{
          temp.push(-1*el.temperature);
        }
      });
      const canvas:any = this.refs.canvas;
      if (canvas.getContext!) {
        let ctx:any = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        data.forEach((el:any) => {
          ctx.font = "14px Courier";
          ctx.fillStyle = 'rgba(0, 0, 0, .7)';
          ctx.fillText((moment(el.date).format("LT")),(data.indexOf(el)+0.37)*100, 270);
        })
        for(let i = 0;i<=Math.floor((Math.max(...temp))/5)+1;i++){
          ctx.font = "16px Courier"
          ctx.fillStyle = 'rgba(0, 0, 0, .7)';
          ctx.fillText((i)*5, 0, 250-(i*25))
          ctx.beginPath();
          ctx.moveTo(0, 250-(i*25));
          ctx.lineTo(1000, 250-(i*25)); // (temp.length+0.4)*100
          ctx.lineWidth = .1;
          ctx.closePath();
          ctx.stroke();
        }
        data.forEach((el:any) => {
          if(el.temperature < 0){
            for(let i=0; i<=-(el.temperature*5);i++){
              if((el.temperature*5)<-i){
                ctx.fillStyle = '#01BBFE'
                setTimeout(() =>
                  ctx.fillRect((data.indexOf(el)+0.4) * 100, 250, 50, -i)
                ,500);
              }
            }
          }
          else{
            let my_gradient = ctx.createLinearGradient(0, 0, 0, 170);
            for(let i=0; i<=(el.temperature*5);i++){
              if((el.temperature*5)>i){
                my_gradient.addColorStop(0.3, "#FE4401");
                my_gradient.addColorStop(0.6, "#FE2F2F");
                my_gradient.addColorStop(1, "#FEC301");
                ctx.fillStyle = my_gradient;
                setTimeout(() =>
                  ctx.fillRect((data.indexOf(el)+0.4) * 100, 250, 50, -i)
                ,500);
              }
            }    
          }
        });
      }
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