// Variables to store references to elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearCompletedButton = document.getElementById('clear-completed');
const filterOptions = document.querySelectorAll('.filter-option');
const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');
const body = document.body;

let draggedItem = null;

// Event listener for submitting the form
todoForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  const todoText = todoInput.value;
  if (todoText.trim() !== '') {
    addTodoItem(todoText);
    todoInput.value = '';
  }
});

// Event listener for clearing completed to-dos
clearCompletedButton.addEventListener('click', function() {
  const completedItems = document.querySelectorAll('.completed');

  completedItems.forEach(function(item) {
    deleteTodoItem(item.getAttribute('data-id'));
  });
});

// Event listener for filter options
filterOptions.forEach(function(option) {
  option.addEventListener('click', function() {
    filterOptions.forEach(function(option) {
      option.classList.remove('active');
    });

    option.classList.add('active');

    const filter = option.getAttribute('data-filter');
    filterTodos(filter);
  });
});

// Event listener for theme toggle
themeToggleCheckbox.addEventListener('change', function() {
  toggleTheme();
});

// Function to add a new to-do item
function addTodoItem(todoText) {
  const todoItem = document.createElement('li');
  const checkbox = document.createElement('input');
  const todoLabel = document.createElement('label');
  const deleteButton = document.createElement('button');

  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', toggleComplete);

  // SQL request to add a new todo item
  const requestBody = {
    title: todoText,
    description: ''
  };

  fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
      todoItem.setAttribute('data-id', data.data.id);
      todoLabel.textContent = data.data.title;
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', deleteTodo);
      todoItem.draggable = true;
      todoItem.addEventListener('dragstart', dragStart);
      todoItem.addEventListener('dragover', dragOver);
      todoItem.addEventListener('dragenter', dragEnter);
      todoItem.addEventListener('dragleave', dragLeave);
      todoItem.addEventListener('drop', dragDrop);
      todoItem.addEventListener('dragend', dragEnd);

      todoItem.appendChild(checkbox);
      todoItem.appendChild(todoLabel);
      todoItem.appendChild(deleteButton);
      todoList.appendChild(todoItem);
    })
    .catch(error => {
      console.error('Error creating todo:', error);
    });
}

// Function to toggle the completed status of a to-do item
function toggleComplete() {
  const todoItem = this.parentElement;
  const todoId = todoItem.getAttribute('data-id');
  const completed = this.checked;

  // SQL request to update the completed status of a todo item
  const requestBody = {
    completed: completed
  };

  fetch(`/api/todos/${todoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
      todoItem.classList.toggle('completed');
    })
    .catch(error => {
      console.error('Error updating todo:', error);
    });
}

// Function to delete a to-do item
function deleteTodo() {
  const todoItem = this.parentElement;
  const todoId = todoItem.getAttribute('data-id');

  // SQL request to delete a todo item
  fetch(`/api/todos/${todoId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      todoItem.remove();
    })
    .catch(error => {
      console.error('Error deleting todo:', error);
    });
}

// Function to filter to-dos based on the selected option
function filterTodos(filter) {
  const todoItems = document.querySelectorAll('#todo-list li');

  todoItems.forEach(function(item) {
    if (filter === 'all') {
      item.style.display = 'flex';
    } else if (filter === 'active' && item.classList.contains('completed')) {
      item.style.display = 'none';
    } else if (filter === 'completed' && !item.classList.contains('completed')) {
      item.style.display = 'none';
    } else {
      item.style.display = 'flex';
    }
  });
}

// Function to toggle the theme between light and dark mode
function toggleTheme() {
  body.classList.toggle('dark-mode');

  // Save the theme preference in local storage
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Function to handle drag start event
function dragStart() {
  draggedItem = this;
  setTimeout(() => (this.style.opacity = '0.5'), 0);
}

// Function to handle drag over event
function dragOver(event) {
  event.preventDefault();
}

// Function to handle drag enter event
function dragEnter(event) {
  event.preventDefault();
  this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
}

// Function to handle drag leave event
function dragLeave() {
  this.style.backgroundColor = 'transparent';
}

// Function to handle drop event
function dragDrop() {
  const itemToInsertBefore = this.nextSibling;
  const parentElement = this.parentElement;
  parentElement.removeChild(draggedItem);
  parentElement.insertBefore(draggedItem, itemToInsertBefore);
  this.style.backgroundColor = 'transparent';
}

// Function to handle drag end event
function dragEnd() {
  this.style.opacity = '1';
  draggedItem = null;
}
