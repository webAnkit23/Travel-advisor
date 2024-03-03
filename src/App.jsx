
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import List from './Components/List/List';
import Map from './Components/Map/Map';
import { getPlaces } from './Apis/places';
import { useRef } from 'react';
import { useEffect, useState } from 'react';
function App() {
 const [center ,setCenter] = useState({lat : 0 ,lng : 0});
 const [bounds ,setBounds] = useState(null);
 const [places,setPlaces] = useState(null);
 const [searchType ,setSearchType] = useState('attractions');
 const [rating ,setRating] = useState('all');
 const [loading ,setLoading] = useState(false);
 const placesRef = useRef();
 placesRef.current =[];
useEffect(() =>{
  function resolve(data){
    setCenter({lat : data.coords.latitude , lng : data.coords.longitude});
}
function reject(err){
  console.log(err);
}
 navigator.geolocation.getCurrentPosition(resolve ,reject);
},[]);

 useEffect(() =>{
  setLoading(true);
   getPlaces(bounds?.sw,bounds?.ne,searchType ,rating)
   .then((data) =>{
    console.log(data);
   setPlaces(data);
   setLoading(false);
 }
 )
 },[bounds,center,searchType,rating]);
 
  return (
             <>
                    <Navbar setCenter ={setCenter}/>
                    <div style={{display: 'grid',gridTemplateColumns: '.3fr 1fr'}}>
                     <List placesRef ={placesRef} places ={places} setSearchType ={setSearchType} setRating ={setRating} loading ={loading}/>
                      <Map placesRef={placesRef} center ={center} setCenter={setCenter} setBounds ={setBounds} places ={places}/>
                    </div>
                    </>
                                                               
  )
}

export default App
