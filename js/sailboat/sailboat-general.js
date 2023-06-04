let sailboatList = [];

const boatTypes = ["40 Foot", "25 Foot", "25-40 Foot"]


function boatTypeDropdown(elementId) {
    const select = document.getElementById(elementId);

    const optGroup = document.createElement("optgroup");
    optGroup.label = "Boat Types";
    select.appendChild(optGroup)
    boatTypes.forEach(element => {
        addToDropdown(element, optGroup)
    })

}

function addToDropdown(element, group) {
    const option = document.createElement("option");
    option.text = element;
    option.value = element;
    group.appendChild(option)
}


const SailboatType = {
    FOOT_25: "FOOT_25",
    FOOT_40: "FOOT_40",
    FOOT_25_40: "FOOT_25_40",
    DEFAULT: "DEFAULT"
};


function createSailboat() {
    const newSailboatBody = {
        name: document.getElementById("boat-name").value,
        type: convertToEnumValue(document.getElementById("boat-type").value)
    };
    console.log(newSailboatBody);
    document.querySelector("#new-boat-spinner").style.display = "block";
    document.querySelector("#new-boat-button").style.display = "none";
    api("api/post/create/sailboat", "post", newSailboatBody)
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
                document.querySelector("#new-boat-spinner").style.display = "none";
                document.querySelector("#new-boat-button").style.display = "block";
                window.location.reload();
            }, 2000)
        });
}

function convertToEnumValue(value) {
    if (value === "40 Foot") {
        return SailboatType.FOOT_40;
    } else if (value === "25 Foot") {
        return SailboatType.FOOT_25;
    } else if (value === "25-40 Foot") {
        return SailboatType.FOOT_25_40;
    } else {
        // Handle unrecognized values or return a default enum value
        return SailboatType.DEFAULT;
    }
}

function loadSailboatList() {
    api("api/get/findAll/sailboats", "get").then(response => {
        sailboatList = response;
        console.log(sailboatList);


        for (let i = 0; i < sailboatList.length; i++) {
            sName = sailboatList[i].name;
            console.log(sName);
            sShortDescription = sailboatList[i].type;
            if (sShortDescription === "FOOT_25") {
                sShortDescription = "25 Foot";
            } else if (sShortDescription === "FOOT_40") {
                sShortDescription = "40 Foot";
            } else if (sShortDescription === "FOOT_25_40") {
                sShortDescription = "25-40 Foot";
            }
            createRow(sailboatList[i], sName, sShortDescription);
            console.log(sailboatList[i].id);
        }
    })
}

function createRow(element, sName, sShortDescription) {
    const a = document.createElement("a");
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const input = document.createElement("input");
    a.className = "periodic-element just-trying";
    a.type = "button";

    div.className = "periodic-element-inner";
    div2.className = "title";
    div2.textContent = sName.slice(0, 2)
    div3.className = "description";
    div3.textContent = sName;
    input.name = "sailboat";
    input.value = element.id;
    console.log(element)
    input.style.display = "none";
    a.setAttribute("data-description", sShortDescription);

    a.setAttribute("data-toggle", "modal");
    a.setAttribute("data-target", "#edit-a-sailboat");
    a.onclick = function () {
        renderEditSailboatForm(element)
        renderDeleteSailboatForm(element.id)
    }

    div.appendChild(div2);
    div.appendChild(div3);
    div.appendChild(input);
    a.appendChild(div);
    table.appendChild(a);
}

function renderEditSailboatForm(id) {
    console.log(id.id);
    const name = document.getElementById("boat-name");
    const type = convertToEnumValue(document.getElementById("boat-type"));

    name.value = id.name;
    type.value = id.type;


    const button = document.getElementById("update-boat-button");
    button.onclick = function () {
        editBoat(id.id);
    }
}


function editBoat(boatId) {
    const name = document.getElementById("boat-name").value;
    const typeElement = document.getElementById("boat-type");
    const type = convertToEnumValue(typeElement.value);

    const boatBody = {
        id: boatId,
        name: name,
        type: type,
    };
    console.log(newParticipantBody)
    document.querySelector("#update-boat-spinner").style.display = "block";
    document.querySelector("#update-boat-button").style.display = "none";
    document.querySelector("#delete-boat-button").style.display = "none";
    api("api/post/update/" + boatId + "/sailboat", "post", boatBody)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error("Error:", error);
        })
        .finally(() => {
            setTimeout(() => {
                document.querySelector("#update-boat-spinner").style.display = "none";
                document.querySelector("#update-boat-button").style.display = "block";
                document.querySelector("#delete-boat-button").style.display = "block";
                window.location.reload();
            }, 2000)
        });
}


function renderDeleteSailboatForm(id) {
    console.log(id);
    const button = document.getElementById("delete-boat-button");
    button.onclick = function () {
        deleteBoat(id);
    }
}

function deleteBoat(boatId) {
    console.log(boatId);
    document.querySelector("#update-boat-spinner").style.display = "block";
    document.querySelector("#update-boat-button").style.display = "none";
    document.querySelector("#delete-boat-button").style.display = "none";
    api("api/post/delete/" + boatId + "/sailboat", "post")
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error("Error:", error);
        })
        .finally(() => {
            setTimeout(() => {
                document.querySelector("#update-boat-spinner").style.display = "none";
                document.querySelector("#update-boat-button").style.display = "block";
                document.querySelector("#delete-boat-button").style.display = "block";
                window.location.reload();
            }, 2000)
        });

}
