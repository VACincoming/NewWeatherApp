import {Bar} from 'react-chartjs-2';
import React from 'react'
import './chart.css'
import moment from 'moment'
import { Stage, Layer, Rect, Text, Star, Line, Circle } from 'react-konva';
import Konva from 'konva';
import {Spinner, OverlayTrigger, Tooltip, Button } from 'react-bootstrap'
import { ReactComponent } from '*.svg';


interface Props {
  // allData: any,
  arrayToday: ItemOfData[],
  arraySecondDay: ItemOfData[],
  arrayThirdDay: ItemOfData[],
  arrayFourDay: ItemOfData[],
  arrayFiveDay: ItemOfData[],
  loading: boolean
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
  render(){
   const graphic = <Stage width={700} height={500}>
   <Layer>
    {this.props.arraySecondDay.map((element) =>
   <Rect
   key={element.id}
     x={this.props.arraySecondDay.indexOf(element) * 70}
     y={250}
     width={50}
     height={-(element.temperature! * 10)}
     fill="orange"
     shadowBlur={5}
   ></Rect>
    )}
 
   </Layer>
</Stage>
    return(
      <div className="chart">
        1231
        {graphic}
      </div>
    )
  }
}

// const toolTip = this.props.arraySecondDay.map((element) =>
// <OverlayTrigger
//   key={element.id}
//   placement='top'
//   overlay = {
//     <Tooltip id={element.id}>
//       qweq
//     </Tooltip>
//   }
// >
//   <Rect
//     x={this.props.arraySecondDay.indexOf(element) * 170}
//     y={250}
//     width={150}
//     height={-(element.temperature! * 10)}
//     fill="orange"
//     shadowBlur={5}
//   ></Rect>
// </OverlayTrigger>
// )
// \




{/* <Rect
                x={20}
                y={20}
                width={50}
                height={50}
                fill='red'
                shadowBlur={5}
              />
              <Rect
                x={40}
                y={40}
                width={50}
                height={50}
                fill="red"
                shadowBlur={5}
              /> */}