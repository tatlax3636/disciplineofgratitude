//global variables
var httpRequest;
let dropdown = document.getElementsByClassName('user-select')[0];
let leavesDisplay = document.getElementsByClassName('all-leaves-container')[0];
let users = [];
let leaves = [];
let selectedLeaves = [];
let url = "https://api.mlab.com/api/1/databases/heroku_49mrv4g0/collections/leaves?apiKey=0qvWZe2FVufM8yIjnQa3_QGU9YdtysS1"

function makeRequest() {
    httpRequest = new XMLHttpRequest();


    httpRequest.onreadystatechange = getLeaves;
    //httpRequest.onreadystatechange = addLeaves;
    httpRequest.open('GET', url);
    httpRequest.send();
}


//get leaves to populate page


//event Listeners
dropdown.addEventListener('change', function (e) {
    getSelectedLeaves(dropdown.value)
})

document.addEventListener('DOMContentLoaded', function (e) {
    makeRequest();
    getLeaves();
    
})

function populateDropdown() {
    let defaultOption = document.createElement('option');
    dropdown.append(defaultOption);
    defaultOption.innerText = "All users";
    defaultOption.value = "all";
    defaultOption.selected = true;

    for (let i = 0; i < leaves.length; i++) {
        author = leaves[i].author;
        if (users.includes(author)) {

        } else {
            users.push(author);
            let newOption = document.createElement('option')
            dropdown.append(newOption);
            newOption.value = author;
            newOption.innerText = author;
        }

    }
}

function getSelectedLeaves(value) {
    leavesDisplay.innerHTML = "";
    for (let i = 0; i < leaves.length; i++) {
        author = leaves[i].author;
        if (author == value || value == "all") {
            let newLeafDisplay = document.createElement('div');
            newLeafDisplay.classList.add('selectedLeaf');
            newLeafDisplay.innerText = leaves[i].content + "\n" + "-" + leaves[i].author;
            leavesDisplay.append(newLeafDisplay)
        }
    }

}

function getLeaves() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            leaves = [];
            let response = JSON.parse(httpRequest.responseText)
            for (let i = 0; i < response.length; i++) {
                leaves.push(response[i])
            }
            populateDropdown();
            getSelectedLeaves("all");
        } else {
            alert('There was a problem with the request.');
        }
    }
}


