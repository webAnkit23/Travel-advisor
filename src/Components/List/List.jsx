import React, { useEffect } from 'react'
import './List.css'
import Card from '../Card/Card';
import Spinner from '../Spinner';
import { FaRegSadTear } from "react-icons/fa";
export default function List({places,setSearchType ,setRating,loading,placesRef}) {
  const handleRating =(e) =>{
     let val = e.target.value;
     if(val==='All'){
      setRating('1');
      return;
     }
     val = val.substring(val.lastIndexOf(' '));
     setRating(val);
  }
  const handleSearchType =(e) =>{
    console.log(e.target.value.toLowerCase());
    setSearchType(e.target.value.toLowerCase());
  }
  const addToRef=(el)=>{
    if(el&&!placesRef.current.includes(el)){
      placesRef.current.push(el);
    }
  }    
  return (
    <div className="listContainer">
          <div className="listHeader">
            <h2> Best places to visit</h2>
            <div className="listSelection">
                <select className='narrowSearchoption select' onChange={(e) =>handleSearchType(e)}>
                    <option>Attractions</option>
                    <option>Hotels</option>
                    <option>Restaurants</option>
                </select>
                <select className='ratings select' onChange={(e) =>handleRating(e)}>
                    
                    <option>All</option>
                    <option>min 5</option>
                    <option>min 4</option>
                    <option>min 3</option>
                  
                </select>
            </div>
          </div>
          <div className="displayList">
            {
              !loading?( places?.length!==0?(places?.map((place,i) =>{
                      return<div key ={i}  ref={addToRef}>
                      <Card place ={place}/>
                      </div>})):(<div><p  className='noresult'>No result Found </p> <FaRegSadTear size={40} color='#55b0b4'/></div>)
                  ):<Spinner />
                 
               }
          </div>
    </div>
  )
}
