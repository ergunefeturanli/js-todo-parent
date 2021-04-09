function clearAllTodos() {
    if (confirm('Dou you really want to delete all todos?')) {
        //todoList.innerHTML = ''  //Slow Way

        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild)
        }
        localStorage.removeItem('todosfx')
    }

}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase()
    const listItems = document.querySelectorAll('.list-group-item')

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase()
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute('style', 'display : none !important')
        } else {
            listItem.setAttribute('style', 'display : block')
        }
    })

}

function deleteTodo(e) {

    if (e.target.className === 'fa fa-remove') {
        e.target.parentElement.parentElement.remove()
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert('success', 'You have deleted your todo!', 1500)
    }
}

function deleteTodoFromStorage(deleteTodo) {
    let todosfx = getTodosFromStorage()

    todosfx.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todosfx.splice(index, 1)
        }
    })

    localStorage.setItem('todosfx', JSON.stringify(todosfx))
}

function loadAllTodosToUI() {
    let todosfx = getTodosFromStorage()

    todosfx.forEach(function (todo) {
        addTodoToUI(todo)
    })
}

function addTodo(e) {
    const newTodo = todoInput.value.trim()
    let todosfx = getTodosFromStorage()
    if (newTodo === '') {
        showAlert('danger', 'Please add a valid Todo!')
    } else if (todosfx.includes(newTodo)) {
        showAlert('danger', 'There is already same Todo exist!')
    } else {
        addTodoToUI(newTodo)
        addTodoToStorage(newTodo)
        showAlert('success', 'You have added your Todo successfully')
    }

    e.preventDefault()
}

function getTodosFromStorage() {
    let todosfx

    if (localStorage.getItem('todosfx') === null) {
        todosfx = []
    } else {
        todosfx = JSON.parse(localStorage.getItem('todosfx'))
    }
    return todosfx
}

function addTodoToStorage(newTodo) {
    let todosfx = getTodosFromStorage()

    todosfx.push(newTodo)

    localStorage.setItem('todosfx', JSON.stringify(todosfx))

}

function showAlert(type, message, time = 1500) {

    const alert = document.createElement('div')
    alert.className = `alert alert-${type}`
    alert.textContent = message

    firstCardBody.appendChild(alert)
    setTimeout(function () {
        alert.remove()
    }, time)

}

function addTodoToUI(newTodo) { 

    //List Item
    const listItem = document.createElement('li')

    //Link
    const link = document.createElement('a')
    link.href = '#'
    link.className = 'delete-item'
    link.innerHTML = '<i class="fa fa-remove"></i>'

    listItem.className = 'list-group-item d-flex justify-content-between'
    //Text Node
    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(link)

    todoList.appendChild(listItem)

    todoInput.value = ''
}