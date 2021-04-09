//Selecting All Elements
const form = document.querySelector('#todo-form')
const todoInput = document.querySelector('#todo')
const todoList = document.querySelector('.list-group')
const firstCardBody = document.querySelectorAll('.card-body')[0]
const secondCardBody = document.querySelectorAll('.card-body')[1]
const filter = document.querySelector('#filter')
const clearButton = document.querySelector('#clear-todos')

eventListeners()

function eventListeners() {  //Event listeners
    form.addEventListener('submit', addTodo)
    document.addEventListener('DOMContentLoaded', loadAllTodosToUI)
    secondCardBody.addEventListener('click', deleteTodo)
    filter.addEventListener('keyup', filterTodos)
    clearButton.addEventListener('click', clearAllTodos)
}

