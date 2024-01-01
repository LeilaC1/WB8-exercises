"use strict";

window.onload = init;

function init() {
    const editTodoForm = document.getElementById("editTodoForm");
    const updateTaskBtn = document.getElementById("updateTask");
    const cancelBtn = document.getElementById("cancel");

    const todoId = getToDoIdFromURL();

    updateTaskBtn.addEventListener("click", updateTodo);
    cancelBtn.addEventListener("click", cancelUpdate);
}

function fetchToDoData(todoId) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
        .then(response => response.json())
        .then(data => {
            populateForm(data);
        })
        .catch(error => {
            console.error("Error fetching ToDo data:", error);
            alert("An error occurred while fetching ToDo data. Please try again.");
        });
}

function populateForm(todoData) {
    document.getElementById("todoId").value = todoData.id;
    document.getElementById("completed").checked = todoData.completed; 
}

function updateTodo() {
    const formData = new FormData(document.getElementById("editTodoForm"));
    const updatedTodoData = {
        id: formData.get("todoId"),
        completed: formData.get("completed") === "on", 
    };

    console.log("Updated ToDo Data:", updatedTodoData);

    fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTodoData.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodoData),
    })
    .then(async response => {
        if (!response.ok) {
            throw new Error("Response was not ok");
        }
        return response.json();
    })
    .then(updatedData => {
        displayResult(updatedData);
        alert("ToDo updated successfully! " + JSON.stringify(updatedData));
    })
    .catch(error => {
        console.error("Error updating ToDo:", error);
        alert("An error occurred while updating ToDo. Please try again.");
    });
}

function cancelUpdate() {
    console.log("Update canceled!");
    alert("Update canceled!");
}

function getToDoIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

function displayResult(todoData) {
    console.log("ToDo Data:", todoData);
}
