export const geoUrl ='https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?namePrefix='; 

export const  options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cbc4e4c854msh2b5d46f084c6d44p1ffc95jsn0926f3a0c272',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};
export async function getLocation(url){
    try {
        const response = await fetch(geoUrl+url, options);
        const result = await response.json(); 
        return result;
    } catch (error) {
       throw new Error('fetching not possible');
    }
}

