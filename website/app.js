// Personal API Key for OpenWeatherMap API
const apiKey = '98671a0d0e705742e25b1605c19c3d49';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
async function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    try {
        const weatherData = await getWeatherData(baseUrl, zipCode, apiKey);
        const data = {
            temperature: weatherData.main.temp,
            date: new Date().toLocaleDateString(),
            userResponse: feelings
        };

        await postData('/add', data);
        await updateUI();
    } catch (error) {
        console.log('Error:', error);
    }
}

/* Function to GET Web API Data*/
const getWeatherData = async(baseUrl, zip, key) => {
    const res = await fetch(`${baseUrl}${zip}&appid=${key}`);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
}

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

/* Function to GET Project Data and update UI */
const updateUI = async() => {
    const request = await fetch('/all');
    if (!request.ok) {
        throw new Error(`HTTP error! status: ${request.status}`);
    }
    const allData = await request.json();
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temperature)}°F`;
    document.getElementById('content').innerHTML = `Feeling: ${allData.userResponse}`;
}