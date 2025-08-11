const API_URL = "http://localhost:3333";

async function fetchJson(url) {
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
}

const getDashboardData = async query => {
    try{
        const destination = fetchJson(`${API_URL}/destinations?search=${query}`);
        const weather = fetchJson(`${API_URL}/weathers?search=${query}`);
        const airport = fetchJson(`${API_URL}/airports?search=${query}`);
        
        const promises = [destination, weather, airport];
        const [destinationData, weatherData, airportData] = await Promise.all(promises);
    
        return {
            city: destinationData[0].name,
            country: destinationData[0].country,
            temperature: weatherData[0].temperature,
            weather: weatherData[0].weather_description,
            airport: airportData[0].name
        }
    }catch{
        throw new Error(`Errore nel recupero dei dati: ${error.message}`);
    }
}

getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));