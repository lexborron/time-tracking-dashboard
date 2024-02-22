let hobbyData = []; // empty array for json data to go into

fetch('data.json')
    .then(response => response.json()) // checks if repsonse is successful, parses to JS
    .then(json => { // work with the parsed data now
        hobbyData = json; // put data into empty array
        renderDashboard(hobbyData, 'daily'); // daily dashboard is default
    })
    .catch(error => console.error('Error fetching data:', error));

// event handler setup
const setupEventListeners = () => {
    const buttons = document.querySelectorAll('[data-timeframe]');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const timeframe = button.getAttribute('data-timeframe');
            renderDashboard(hobbyData, timeframe);
        });
    });
};

document.addEventListener('DOMContentLoaded', setupEventListeners);

// renders each article component depending on timeframe clicked on
function renderDashboard(hobbies, timeframe) {
    const dashboard = document.getElementById('dashboard');
    clearDashboard(dashboard);

    // hobby === object in the array
    hobbies.forEach(hobby => {
        console.log(hobby)
        const timeframeObj = hobby.timeframes[timeframe];
        const article = createArticleElement(hobby, timeframeObj, timeframe);
        dashboard.appendChild(article);
    });

}

// will clear all html content to make room for new dashboard
function clearDashboard(dashboard) {
    dashboard.innerHTML = '';
}

// creates reusable hobby component
function createArticleElement(hobby, timeframeObj, timeframe) {
    const article = document.createElement('article');
    const timeLabel = getTimeLabel(timeframe);
    article.classList.add(`${hobby.title.toLowerCase().split(' ').join('-')}`);
    article.innerHTML = `
        <header class="flex">
            <h2>${hobby.title}</h2>
            <img class="ellipsis" src="images/icon-ellipsis.svg" alt="More options menu icon">
        </header>
        <div class="flex">
        <p class="current-hours">${timeframeObj.current}hrs</p>
        <p>${timeLabel} - ${timeframeObj.previous}hrs</p>
        </div>
    `;

    return article;
}

// generates proper history label depending on timeframe
function getTimeLabel(timeframe) {
    if (timeframe === 'daily') {
        return 'Yesterday';
    } else if (timeframe === 'weekly') {
        return 'Last week';
    } else {
        return 'Last month';
    }
}