import { useEffect, useState } from "react";
export default function useFetch(url){
     const [data,setData] = useState(null);
     const [loading ,setLoading] =useState(false);
     const [error ,setError] = useState(null);
     useEffect(() =>{
       const FetchData = async() =>{
        setLoading(true);
        setError(null);
        try{
        const response = await fetch(url);
        if(!response.ok){
              throw new Error('fetching not possible');
        }
        const fetchData = await response.json();
        setData(fetchData); 
       }
      catch(err){
        setError(err);
      }
      finally{
        setLoading(false);
      }
    }
    FetchData();
     },[url]);
     return {data,loading ,error};
}