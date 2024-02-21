let hobbyData = []; // empty array for json data to go into

fetch(data.json)
    .then(response => response.json()) // checks if repsonse is successful, parses to JS
    .then(json => { // work with the parsed data now
        hobbyData = json; // put data into empty array
        renderDashboard(hobbyData);
    })
    .catch(error => console.error('Error fetching data:', error));