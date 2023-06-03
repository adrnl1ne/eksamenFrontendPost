let participantList = [];

function createSailboatDropdown(elementId) {
    const select = document.getElementById(elementId);

    api("api/get/findAll/sailboats", "get").then(response => {
        const sailboatList = response;
        console.log(sailboatList);

        // Fetch existing participants
        api("api/get/findAll/participant", "get").then(participantsResponse => {
            const participants = participantsResponse;

            // Clear existing options
            select.innerHTML = "";

            sailboatList.forEach(sailboat => {
                // Check if participant with matching name exists
                const existingParticipant = participants.find(participant => participant.boatName === sailboat.name);
                if (!existingParticipant) {
                    // No participant with matching name found, add the sailboat to the dropdown
                    const option = document.createElement("option");
                    option.text = sailboat.name;
                    option.value = sailboat.id;
                    select.appendChild(option);
                }
            });
        }).catch(error => {
            console.error("Error retrieving participants:", error);
        });
    });
}

function createParticipant() {
    const boatDropdown = document.getElementById("race-participant");
    const selectedOption = boatDropdown.options[boatDropdown.selectedIndex];
    console.log(selectedOption);

    const newParticipantBody = {
        boatName: selectedOption.text,
        boatType: convertToEnumValue(document.getElementById("boat-type").value),
        boatId: selectedOption.value
    };

    console.log(newParticipantBody);
    document.querySelector("#new-participant-spinner").style.display = "block";
    document.querySelector("#new-participant-button").style.display = "none";
    api("api/post/create/participant", "post", newParticipantBody)
        .then(response => {
            // Handle the response
            console.log(response);
        })
        .catch(error => {
            // Handle the error
            console.error(error);
        })
        .finally(() => {
            setTimeout(() => {
                document.querySelector("#new-participant-spinner").style.display = "none";
                document.querySelector("#new-participant-button").style.display = "block";
                window.location.reload();
            }, 2000)
        });
}

function loadParticipantList() {
    api("api/get/findAll/participant", "get").then(response => {
        participantList = response;
        console.log(participantList);

        for (let i = 0; i < participantList.length; i++) {
            pName = participantList[i].boatName;
            console.log(pName);
            pShortDescription = participantList[i].boatType;
            if (pShortDescription === "FOOT_25") {
                pShortDescription = "25 Foot";
            } else if (pShortDescription === "FOOT_40") {
                pShortDescription = "40 Foot";
            } else if (pShortDescription === "FOOT_25_40") {
                pShortDescription = "25-40 Foot";
            }

            createParticipantRow(participantList[i], pName, pShortDescription);
            console.log(participantList[i]);
        }
    });
}

function createParticipantRow(element, pName, pShortDescription) {
    const a = document.createElement("a");
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const input = document.createElement("input");
    a.className = "periodic-element just-trying";
    a.type = "button";

    div.className = "periodic-element-inner";
    div2.className = "title";
    div2.textContent = pName.slice(0, 2)
    div3.className = "description";
    div3.textContent = pName;
    input.name = "participant";
    input.value = element.id;
    console.log(element)
    input.style.display = "none";
    a.setAttribute("data-description", pShortDescription);

    a.setAttribute("data-toggle", "modal");
    a.setAttribute("data-target", "#edit-a-participant");
    a.onclick = function () {
        renderEditParticipantForm(element)
        renderDeleteParticipantForm(element.id)
    }

    div.appendChild(div2);
    div.appendChild(div3);
    div.appendChild(input);
    a.appendChild(div);
    table.appendChild(a);
}

//make later, because it only needs to be able to change the race date
function renderEditParticipantForm(id) {
    console.log(id.id)
    const name = document.getElementById("boat-name");
    const type = convertToEnumValue(document.getElementById("boat-type"));

    name.value = id.boatName;
    type.value = id.boatType;

    const button = document.getElementById("update-participant-button");
    button.onclick = function () {
        editParticipant(id.id);
    }
}

function editParticipant(participantId) {
    const name = document.getElementById("boat-name").value;
    const typeElement = document.getElementById("boat-type").value;
    const type = convertToEnumValue(typeElement);
    const newParticipantBody = {
        id: participantId,
        boatName: name,
        boatType: type
    };
    console.log(newParticipantBody)
    api("api/post/update/" + participantId + "/participant", "put", newParticipantBody)
        .then(() => {
            confirmationButtonChange();
        })
        .catch(error => {
            console.error(error);
        });
}

function renderDeleteParticipantForm(id) {
    console.log(id)
    const button = document.getElementById("delete-participant-button");
    button.onclick = function () {
        deleteParticipant(id);
    }
}

function deleteParticipant(participantId) {
    console.log(participantId)
    api("api/post/delete/" + participantId + "/participant", "delete")
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
    confirmationButtonChange();
}