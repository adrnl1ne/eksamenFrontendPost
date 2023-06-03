function displayRaceResults() {
    api("api/get/findAll/participant", "get").then(response => {
        console.log(response);
        const tableBody = document.querySelector('#race-results tbody');
        const sortedParticipants = response.sort((a, b) => a.points - b.points);
        tableBody.innerHTML = '';

        for (let i = 0; i < sortedParticipants.length; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `
          <td>${sortedParticipants[i].id}</td>
          <td>${sortedParticipants[i].boatName}</td>
          <td>${sortedParticipants[i].boatType}</td>
          <td>${sortedParticipants[i].points}</td>
          
        `;
            tableBody.appendChild(row);
        }
    })
        .catch(error => {
            console.error('Error fetching race results:', error);
        });
}

window.addEventListener('load', displayRaceResults);
