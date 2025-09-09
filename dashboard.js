const API_URL = "http://localhost:3333";

async function fetchJson(url) {
    const response = await fetch(url);
    const obj = await response.json();
    return obj;
}

const getDashboardData = async query => {
    try{
        const destinations = fetchJson(`${API_URL}/destinations?search=${query}`);
        const weathers = fetchJson(`${API_URL}/weathers?search=${query}`);
        const airports = fetchJson(`${API_URL}/airports?search=${query}`);
        
        const promises = [destinations, weathers, airports];
        const [destinationData, weatherData, airportData] = await Promise.all(promises);

        const destination = destinationData[0];
        const weather = weatherData[0];
        const airport = airportData[0];
        
        return {
            city: destination ? destination.name : null,
            country: destination ? destination.country : null,
            temperature: weather ? weather.temperature : null,
            weather: weather ? weather.weather_description : null,
            airport: airport ? airport.name : null
        }
    }catch(error){
        throw new Error(`Errore nel recupero dei dati: ${error.message}`);
    }
}

getDashboardData('vienna')
    .then(data => {
        console.log('Dasboard data:', data);
        let phrase = '';
        if(data.city !== null && data.country !== null){
            phrase += `${data.city} is in ${data.country}.\n`;
        }
        if(data.temperature !== null && data.weather !== null){
            phrase += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
        }
        if(data.airport !== null){
            phrase += `The main airport is ${data.airport}.\n`;
        }
        console.log(phrase);
    })
    .catch(error => console.error(error));