"use strict";

const tabInput = document.querySelector(".tab-input");
const input = document.getElementById("input");
const todosUl = document.querySelector(".todos");
const clearBtn = document.querySelector(".span-right");
const counterItem = document.querySelector(".number");
const body = document.getElementById("body");
const light = document.querySelector(".light");
const icon = document.querySelector(".todo-icon");

let todos = [];

todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

// toggle theame mode
icon.addEventListener("click", (e) => {
  if (e.target) {
    document.getElementById("body").classList.toggle("light");
  }
});

// input todo
tabInput.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;
  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    const circle = document.createElement("span");

    if (todo && todo.completed) {
      todoEl.classList.add("completed");
      circle.classList.add("completed");
    }

    // creating li element
    todoEl.innerHTML = `
    <p class="text">${todoText}</p>
    `;

    // create span circle element
    circle.classList.add("circle");
    todoEl.appendChild(circle);

    // creating span element X
    const cross = document.createElement("span");
    cross.classList.add("cross");
    cross.innerHTML = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
    >
      <path
        fill="#494C6B"
        fill-rule="evenodd"
        d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
      />
    </svg>
    `;

    todoEl.appendChild(cross);
    cross.addEventListener("click", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todoEl.addEventListener("click", (e) => {
      todoEl.classList.toggle("completed");
      circle.classList.toggle("completed");
      updateLS();
    });

    todosUl.appendChild(todoEl);
    input.value = "";
    updateLS();
  }
}

// function uploading localStorage
function updateLS() {
  let todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  counterItem.textContent =
    todos.length > 1
      ? `${todos.length} 개의 할일`
      : `${todos.length} 개의 할일`;

  localStorage.setItem("todos", JSON.stringify(todos));
}

// filter buttons
const buttons = document.querySelector(".btn-grup");
const filters = document.querySelectorAll(".button--filter");

function btnClicked() {
  buttons.addEventListener("click", (e) => {
    const clicked = e.target;

    if (!clicked) return;

    filters.forEach((filter) => filter.classList.remove("active"));

    clicked.classList.add("active");

    if (clicked.id === "filter-active") {
      filterActive();
    }
    if (clicked.id === "filter-all") {
      filterAll();
    }
    if (clicked.id === "filter-completed") {
      filterCompleted();
    }
  });
}
btnClicked();

// filter completed all & active

// completed
function filterCompleted() {
  const todosEl = document.querySelectorAll("li");
  todosEl.forEach((el) => {
    if (!el.classList.contains("completed")) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  });
}

// active
function filterActive() {
  const todosEl = document.querySelectorAll("li");
  todosEl.forEach((el) => {
    if (el.classList.contains("completed")) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  });
}
// all
function filterAll() {
  const todosEl = document.querySelectorAll("li");
  todosEl.forEach((el) => {
    if (el || el.classList.contains("completed")) {
      el.style.display = "block";
    }
  });
}

// clear completed btn
clearBtn.addEventListener("click", (e) => {
  const todosEl = document.querySelectorAll("li");
  todosEl.forEach((el) => {
    if (el.classList.contains("completed")) {
      el.remove();
      updateLS();
    }
  });
});
