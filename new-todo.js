"use strict";

window.onload = init;

function init() {

    document.getElementById("addTask").addEventListener("click", addTodo);

    // fetch user id
   

    
}



function addTodo() {
    // get form data
    const formData = new FormData(document.getElementById("todoForm"));
    const todoData = {
        title: document.getElementById('title').value,
        completed: document.getElementById("completed").value,
    };

    // send a POST request to api/todos
    fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todoData),
    })
    .then(response => {
        console.log("Raw Response:", response);
        return response.json();
    })
    .then(data => {
        console.log("To Do added check:", data);
        // Clear form
        document.getElementById("todoForm").reset();
        displayTodoCard(data);
    })
    .catch(error => {
        console.error("Error adding To Do:", error);
        alert("An error occurred. Please try again.");
    });
}


// display in bootstrap card
function displayTodoCard(todoData) {
    const todoCard = document.createElement("div");
    todoCard.classList.add("todoCard");

    todoCard.innerHTML =
        `<div>
        <div><h4> ID: ${todoData.id}</h4></div>
        <div>
            <p class="card-text">Title: ${todoData.title}</p>
            <p class="card-text" >Completed: ${todoData.completed}</p>
        </div>
    </div>`;

    const todoContainer = document.getElementById("todoContainer");
    todoContainer.appendChild(todoCard);
}

