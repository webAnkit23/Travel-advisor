
import { useEffect,useState,useContext,createContext } from "react";


const userLocationContext = createContext({lat: 0 ,lng:0});

export const useUserLocation =() =>{
    return useContext(userLocationContext);
}
export const LocationProvider =({children})=>{
    const [userLocation ,setUserLocation] = useState({lat: 0 ,lng:0});
    useEffect(() =>{
        function resolve(data){
                setUserLocation({lat : data.coords.latitude , lng : data.coords.longitude});
        }
        function reject(err){
              console.log(err);
        }
            navigator.geolocation.getCurrentPosition(resolve ,reject);
    },[]);
    return <userLocationContext.Provider value={userLocation}>
           {children}
        </userLocationContext.Provider>
}
          