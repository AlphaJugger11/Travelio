// travel_recommendation.js

document.addEventListener('DOMContentLoaded', function () {
    fetchRecommendations();
});

function fetchRecommendations() {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            window.recommendations = data;
        })
        .catch(error => console.error('Error fetching recommendations:', error));
}

function displayRecommendations(category) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    const categoryData = window.recommendations[category];

    if (categoryData) {
        categoryData.forEach(item => {
            const resultDiv = document.createElement('div');
            resultDiv.innerHTML = `
                <h3>${item.name}</h3>
                <img src="${item.imageUrl}" alt="${item.name}">
                <p>${item.description}</p>
            `;
            resultsContainer.appendChild(resultDiv);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}

function searchRecommendations() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (!searchInput.trim()) {
        // If search input is empty, do nothing
        return;
    }

    const allRecommendations = Object.values(window.recommendations).flat();
    const filteredResults = allRecommendations.filter(item =>
        item.name.toLowerCase().includes(searchInput) ||
        item.description.toLowerCase().includes(searchInput)
    );

    if (filteredResults.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
        filteredResults.forEach(item => {
            const resultDiv = document.createElement('div');
            resultDiv.innerHTML = `
                <h3>${item.name}</h3>
                <img src="${item.imageUrl}" alt="${item.name}">
                <p>${item.description}</p>
            `;
            resultsContainer.appendChild(resultDiv);
        });
    }
}

function clearSearchResults() {
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
}
