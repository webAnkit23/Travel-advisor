import React from 'react'
import GoogleMapReact from 'google-map-react';
import fillStar from '../../assets/fillStar.png';
import emptyStar from '../../assets/emptyStar.png';
import './Map.css'

export default function Map({center ,setCenter ,setBounds,places}) {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    }
  }
  const handleChange =(e)=> {
    setCenter({lat : e.center.lat,lng :e.center.lng}); 
    setBounds({ne: e.marginBounds.ne ,sw : e.marginBounds.sw});
  }
  
  return (
    <div style={{width:'100%',height : '85vh'}} className='mapContainer'>
      <GoogleMapReact  bootstrapURLKeys={{ key: "AIzaSyDmbvtQjMzbHFFQVhIqT9_39vm-SzxWjWM" }}
      defaultCenter={defaultProps.center}
        center={center}
        defaultZoom={14}
        margin={[50,50,50,50]}
        onChange={(e) =>{
           handleChange(e);
        }}
        onChildClick={() =>{
        }}
        >
          {places?.slice(0,10).map((place,i) =>{
            return  <MapCard lat = {Number(place.latitude)} lng = {Number(place.longitude)} key={i} place={place}/>    
          })}
      </GoogleMapReact>
    </div>
  )
}

function MapCard({place}){
  const number = Math.ceil(Number(place?.rating||3));
   return (
   
    <div className='mapChild' style={{background:'white' ,zIndex :'1000000'}}>
      <img src={place?.photo?.images?.small?.url}></img>
    <span className='mapName'>{place?.name||'sfbdg'}</span>
    <div className="rating">
    <span><img src={number>=1?fillStar:emptyStar}/></span>
    <span><img src={number>=2?fillStar:emptyStar}/></span>
    <span><img src={number>=3?fillStar:emptyStar}/></span>
    <span><img src={number>=4?fillStar:emptyStar}/></span>
    <span><img src={number>=5?fillStar:emptyStar}/></span>
    </div>
   
 </div>
    );
}