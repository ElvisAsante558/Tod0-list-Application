const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000; // Replace with your desired port number

// Create a MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todos'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Middleware to parse JSON requests
app.use(express.json());

// API endpoint for adding a new todo item
app.post('/todos', (req, res) => {
  try {
    const { title, description } = req.body;

    // Insert the new todo item into the 'todos' table
    const query = `INSERT INTO todos (title, description) VALUES (?, ?)`;
    connection.query(query, [title, description], (error, result) => {
      if (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({
          success: false,
          error: 'Internal server error',
          data: {}
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'To-do item created successfully',
          data: { id: result.insertId, title, description }
        });
      }
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      data: {}
    });
  }
});

// API endpoint for retrieving all todo items
app.get('/todos', (req, res) => {
  try {
    // Fetch all todo items from the 'todos' table
    const query = `SELECT * FROM todos`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error retrieving todos:', error);
        res.status(500).json({
          success: false,
          error: 'Internal server error', 
          data: {}
        });
      } else {
        res.status(200).json({
          success: true,
          data: results
        });
      }
    });
  } catch (error) {
    console.error('Error retrieving todos:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      data: {}
    });
  }
});

// API endpoint for updating a todo item
app.put('/todos/:id', (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, description, completed } = req.body;

    // Update the todo item in the 'todos' table
    const query = `UPDATE todos SET title = ?, description = ?, completed = ? WHERE id = ?`;
    connection.query(query, [title, description, completed, todoId], (error) => {
      if (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({
          success: false,
          error: 'Internal server error',
          data: {}
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'To-do item updated successfully',
          data: { id: todoId, title, description, completed }
        });
      }
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      data: {}
    });
  }
});

// API endpoint for deleting a todo item
app.delete('/todos/:id', (req, res) => {
  try {
    const todoId = req.params.id;

    // Delete the todo item from the 'todos' table
    const query = `DELETE FROM todos WHERE id = ?`;
    connection.query(query, [todoId], (error) => {
      if (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({
          success: false,
          error: 'Internal server error',
          data: {}
        });
      } else {
        res.status(200).json({
          success: true,
          message: 'To-do item deleted successfully',
          data: {}
        });
      }
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      data: {}
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
