import React, {Component} from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker} from 'react-google-maps';
import { geolocated } from "react-geolocated";

let lng = 0;
let lat = 0;
interface Props{
  lat?: any,

}
const displayLocationInfo = (position:any) => {

  console.log("1")
   lng = position.coords.longitude;
   lat = position.coords.latitude;
 }

 if (navigator.geolocation) {
   console.log('0')
   navigator.geolocation.getCurrentPosition(displayLocationInfo);
 }

const Map = () => {
  console.log(lng);
  return(
  <>
    <GoogleMap 
      defaultZoom={8}
      defaultCenter={{lat:lat ,lng:lng}}>
    <Marker 
    position={{
      lat:lat,
      lng:lng
    }}
    />
    </GoogleMap>
    </>
)}

const WrappedMap:any = withScriptjs(withGoogleMap(Map))

export default function App(){
  return (
  <div style={{width: '100%', height: '200px'}}>
    <WrappedMap 
       googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCxX_GmRSO3nsNZpqDQy0KzfOWP9p4keZk`}
       loadingElement={<div style={{ height:'100%' }}></div>}
       containerElement={<div style={{ height: '100%' }}></div>}
       mapElement={<div style={{ height: '100%' }}></div>}
    />  
  </div>
  )
}