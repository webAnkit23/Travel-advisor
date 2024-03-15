import axios from "axios";
const BASE_URL ='https://travel-advisor.p.rapidapi.com/'

export const getPlaces = async(sw,ne,searchType ,rating) =>{
    try {
      const options = {
        params: {
          tr_longitude: ne?.lng||0,
          tr_latitude:  ne?.lat||0,
          bl_longitude: sw?.lng||0,
          bl_latitude:  sw?.lat||0,
        },
        headers: {
          'X-RapidAPI-Key': 'ea18bb3bcemsh173fd9d08afd189p1333b9jsnad84450ff555',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      };
        const {data}= await axios.get(BASE_URL+searchType+'/list-in-boundary',options);
        console.log(data)
        return data.data;
    } catch (error) {
        console.error(error);
        alert('api limit excedded');
    }
}