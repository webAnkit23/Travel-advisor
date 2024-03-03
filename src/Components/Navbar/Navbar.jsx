import React, {useEffect, useRef, useState } from 'react'
import './Navbar.css'
import { IoLocationOutline } from "react-icons/io5";
import {getLocation} from '../../Apis/location';
import useDebounce from '../../Hooks/UseDebouce';
import { useUserLocation } from '../../Context/UserLocationContext';
export default function Navbar({setCenter}) {
  const [query,setQuery] = useState('');
  const [suggestion ,setSuggestion] = useState(null);
  const [showSuggestion ,setShowSuggestion] =useState(false);
   const debounceValue = useDebounce(query,500);
   const inputRef = useRef();
   const userLocation = useUserLocation();
   useEffect(() =>{
    if(debounceValue){
     fetchSuggestions(debounceValue);
    }
    else{
      setSuggestion(null);
    }
 },[debounceValue]);
  const handleChange = (e) =>{
    setQuery(e.target.value);    
  }
  const fetchSuggestions = () =>{
    getLocation(debounceValue)
    .then((data) =>{
      setSuggestion(data);
      setShowSuggestion(true);
    })
    .catch(err =>{
      console.log(err);
    }) 
  }
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestion(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  function handleSuggestionClick(city){
          setCenter({lat : city.latitude ,lng : city.longitude});
          setQuery('');
          setSuggestion(null);
  }
  const handleUserLocation =() =>{
    console.log(userLocation);
    setCenter({lat:userLocation.lat ,lng : userLocation.lng});
   }
  return (
    <div className="nav_container">
        <nav>
            <h3>Travel on your own</h3>
           <div className="nav_inputBox">
            <IoLocationOutline className='myLocation' onClick={handleUserLocation} size={25}/>
            <div className="innerBox" ref = {inputRef}>
                <input type='text' placeholder='Search Location...' value={query} onChange={(e) =>handleChange(e)}></input>
                <div className="suggestionList">
                    {showSuggestion&&suggestion?.data?.map((city,i) =>{
                     return <div key={i} onClick={() =>handleSuggestionClick(city)}>{city?.name}</div>   
                    })}
                </div>
            </div>
           </div>
        </nav>
    </div>
  )
}
