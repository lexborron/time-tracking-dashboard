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
    article.classList.add("dashboard__component");
    article.classList.add(`${activity.title.toLowerCase().split(' ').join('-')}`);
    article.innerHTML = `
        <header class="flex">
            <h2 class="dashboard__activity-title">${activity.title}</h2>
            <img class="ellipsis" src="images/icon-ellipsis.svg" alt="More options menu icon">
        </header>
        <div class="flex times-tracked">
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