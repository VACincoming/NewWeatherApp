import React from 'react'
import { Tab, Table } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs'


interface Props {
  arrayToday: ItemOfData[],
  arrayThreeDays: ItemOfData[],
  arrayFiveDays: ItemOfData[],
}
interface ItemOfData {
  description: string,
  date: string,
  id: number,
}

export default class TabsComponent extends React.Component<Props>{
  render(){
      return (
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
          <Tab eventKey="today" title="Today" active>
              <Table striped bordered hover>
              <thead>
                <tr>
                  <th>date</th>
                  <th>description</th>
                  <th>id</th>
                </tr>
              </thead>
              <tbody>
              { 
                this.props.arrayToday.map(data => (
                  <tr key={data.id}>
                    <td>{data.date}</td>
                    <td>{data.description}</td>
                    <td>{data.id}</td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
        </Tab>
          <Tab eventKey="3 days" title="3 Days">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>date</th>
                  <th>description</th>
                  <th>id</th>
                </tr>
              </thead>
              <tbody>
              { 
                this.props.arrayThreeDays.map(data => (
                  <tr key={data.id}>
                    <td>{data.date}</td>
                    <td>{data.description}</td>
                    <td>{data.id}</td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="5 days" title="5 Days">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>date</th>
                  <th>description</th>
                  <th>id</th>
                </tr>
              </thead>
              <tbody>
              { 
                this.props.arrayFiveDays.map(data => (
                  <tr key={data.id}>
                    <td>{data.date}</td>
                    <td>{data.description}</td>
                    <td>{data.id}</td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      )
  }
}