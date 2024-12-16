const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo_input');
const todoListUL = document.getElementById('todo_list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}
function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    })
}
function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
                <input type="checkbox" id="${todoId}">
                <label for="${todoId}" class="check_box">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/></svg>
                </label>

                <label for="${todoId}" class="todo_text">
                ${todoText}
                </label>
                <button class="delete_todo">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120v-600h-40v-80h200v-40h240v40h200v80h-40v600H200Zm80-80h400v-520H280v520Zm80-80h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
    `
    const deleteTodo = todoLI.querySelector(".delete_todo");
    deleteTodo.addEventListener("click", ()=> {
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", ()=> {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.completed;
    return todoLI;
}

function deleteTodoItem(todoIndex) {
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodos();
    updateTodoList();
}

function saveTodos() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson);
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}