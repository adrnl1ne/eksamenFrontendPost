function displayRaceResults() {
    api("api/get/findall/participant", "get").then(response =>{
        content = response;
            const tableBody = document.querySelector('#race-results tbody');

            tableBody.innerHTML = '';

            for (let i = 0; i < content.length; i++) {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${content.participant}</td>
          <td>${content.boatType}</td>
          <td>${content.placement}</td>
          <td>${content.points}</td>
          <td>${content.status}</td>
        `;
                tableBody.appendChild(row);
            }
        })
        .catch(error => {
            console.error('Error fetching race results:', error);
        });
}

// Call the function to display the race results when the page loads
window.addEventListener('load', displayRaceResults);
