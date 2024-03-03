
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { LocationProvider} from './Context/UserLocationContext'
import List from './Components/List/List';
import Map from './Components/Map/Map';
import { getPlaces } from './Apis/places';
import { useEffect, useState } from 'react';
function App() {
 const [center ,setCenter] = useState({lat : 0 ,lng : 0});
 const [bounds ,setBounds] = useState(null);
 const [places,setPlaces] = useState(null);
 const [searchType ,setSearchType] = useState('attractions');
 const [rating ,setRating] = useState('all');
 const [loading ,setLoading] = useState(false);
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
 const handleUserLocation =() =>{
  function resolve(data){
    setCenter({lat : data.coords.latitude , lng : data.coords.longitude}); 
}
function reject(err){
  console.log(err);
}
 navigator.geolocation.getCurrentPosition(resolve ,reject);
}
  return (
              <LocationProvider>
                    <Navbar handleUserLocation={handleUserLocation} setCenter ={setCenter}/>
                    <div style={{display: 'grid',gridTemplateColumns: '.3fr 1fr'}}>
                     <List places ={places} setSearchType ={setSearchType} setRating ={setRating} loading ={loading}/>
                      <Map center ={center} setCenter={setCenter} setBounds ={setBounds} places ={places}/>
                    </div>
              </LocationProvider>                                                   
  )
}

export default App
