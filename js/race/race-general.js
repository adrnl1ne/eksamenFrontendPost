function displayRaceResults() {
    api("api/get/findall/participant", "get")
        .then(participantsResponse => participantsResponse.json())
        .then(data => {
            console.log(data);
            const raceResults = data.results;
            console.log(raceResults);

            const tableBody = document.querySelector('#race-results tbody');

            tableBody.innerHTML = '';

            raceResults.forEach(result => {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${result.participant}</td>
          <td>${result.boatType}</td>
          <td>${result.placement}</td>
          <td>${result.points}</td>
          <td>${result.status}</td>
        `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching race results:', error);
        });
}

// Call the function to display the race results when the page loads
window.addEventListener('load', displayRaceResults);
