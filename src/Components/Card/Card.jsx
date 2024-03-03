import React from 'react'
import './Card.css'
import fillStar from '../../assets/fillStar.png';
import emptyStar from '../../assets/emptyStar.png'
export default function Card({place}) {
  const number = Math.ceil(Number(place?.rating||0));
  
  return (
    <div className='cardContainer'>
      <div className="imageContainer">
        <img src={place?.photo?.images?.medium?.url}></img>
      </div>
      <h4>{place.name}</h4>
      <div className="rating">
       <span><img src={number>=1?fillStar:emptyStar}/></span>
       <span><img src={number>=2?fillStar:emptyStar}/></span>
       <span><img src={number>=3?fillStar:emptyStar}/></span>
       <span><img src={number>=4?fillStar:emptyStar}/></span>
       <span><img src={number>=5?fillStar:emptyStar}/></span>
       <span className='review'>total review :{place.num_reviews}</span>
      </div>
      <span className="rank">{place?.ranking}</span>
      <span className='price'>Price : <span>{place?.price||`$Unknown`}</span></span>

      <span className='contact price'>contact-info : <span>{place?.phone||`Unknown`}</span></span>
       <div className="cuisine">
         {place?.cuisine?place.cuisine.map((item) =>{
                 return <span key={item.key}>{item.name}</span>
         }):<></>}
       </div>
    </div>
  )
}
