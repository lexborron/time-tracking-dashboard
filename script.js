let activityData = []; // empty array for json data to go into

fetch('data.json')
    .then(response => response.json()) // checks if repsonse is successful, parses to JS
    .then(json => { // work with the parsed data now
        activityData = json; // put data into empty array
        renderDashboard(activityData, 'daily'); // daily dashboard is default
    })
    .catch(error => console.error('Error fetching data:', error));

// event handler setup
const setupEventListeners = () => {
    const buttons = document.querySelectorAll('[data-timeframe]');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(function (btn) {
                btn.classList.remove("active");
            });
            button.classList.add("active");
            const timeframe = button.getAttribute('data-timeframe');
            renderDashboard(activityData, timeframe);
        });
    });
};

document.addEventListener('DOMContentLoaded', setupEventListeners);

// renders each article component depending on timeframe clicked on
function renderDashboard(hobbies, timeframe) {
    const dashboard = document.getElementById('activities');
    clearDashboard(dashboard);

    // activity === object in the array
    hobbies.forEach(activity => {
        console.log(activity)
        const timeframeObj = activity.timeframes[timeframe];
        const article = createArticleElement(activity, timeframeObj, timeframe);
        dashboard.appendChild(article);
    });

}

// will clear all html content to make room for new dashboard
function clearDashboard(dashboard) {
    dashboard.innerHTML = '';
}

// creates reusable activity component
function createArticleElement(activity, timeframeObj, timeframe) {
    const article = document.createElement('article');
    const timeLabel = getTimeLabel(timeframe);

    // create header element
    const header = document.createElement('header');
    header.classList.add('flex');

    // create h2 element for activity title
    const h2 = document.createElement('h2');
    h2.classList.add('dashboard__activity-title');
    h2.textContent = activity.title;

    // create SVG element for ellipsis
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('ellipsis');
    svg.setAttribute('width', '21');
    svg.setAttribute('height', '5');

    // create path element for SVG
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z');
    path.setAttribute('fill-rule', 'evenodd');

    // append path to SVG and SVG to header
    svg.appendChild(path);
    header.appendChild(h2);
    header.appendChild(svg);

    // create div element for times tracked
    const timesTracked = document.createElement('div');
    timesTracked.classList.add('flex', 'times-tracked');

    // create p elements for current and previous hours
    const currentHours = document.createElement('p');
    currentHours.classList.add('current-hours');
    currentHours.textContent = `${timeframeObj.current}hrs`;

    const previousHours = document.createElement('p');
    previousHours.textContent = `${timeLabel} - ${timeframeObj.previous}hrs`;

    // append p elements to timesTracked div
    timesTracked.appendChild(currentHours);
    timesTracked.appendChild(previousHours);

    // append header and timesTracked to article
    article.appendChild(header);
    article.appendChild(timesTracked);

    // add classes to article
    article.classList.add('dashboard__component');
    article.classList.add(`${activity.title.toLowerCase().split(' ').join('-')}`);

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