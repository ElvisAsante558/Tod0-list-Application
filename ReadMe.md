To-Do List Application
This is a simple to-do list application that allows you to manage your tasks. You can add new tasks, mark them as completed, update task details, and delete tasks. The application uses a server-side implementation with Express and MySQL to handle the data storage and API requests.

Features
Add new tasks with a title and optional description.
Mark tasks as completed.
Update task details, including the title, description, and completion status.
Delete tasks from the list.
Filter tasks based on their completion status.
Toggle between light and dark themes.
Getting Started
To get started with the to-do list application, follow these steps:

Prerequisites
Node.js installed on your machine
MySQL database server installed and running
Installation
Clone the repository or download the source code.

Install the required dependencies by running the following command in the project directory:

npm install

Configure the MySQL database connection by modifying the server.js file. 

Update the connection details in the connection object to match your MySQL database setup.

Create the necessary database table by executing the provided SQL code in your MySQL database. You can use the SQL code provided earlier in this document to create the todos table.

Usage
Start the server by running the following command in the project directory:

npm start
Open your web browser and navigate to http://localhost:4000

Use the application to manage your to-do list. You can add new tasks, mark them as completed, update task details, and delete tasks. You can also filter the tasks based on their completion status and toggle the theme between light and dark mode.

Customization
You can customize the application by modifying the HTML, CSS, and JavaScript files in the project. The index.html file contains the structure of the web page, the styles.css file contains the styling, and the script.js file contains the client-side JavaScript code for interacting with the server-side API.

Contributing
Contributions to the to-do list application are welcome! If you have any ideas, improvements, or bug fixes, please submit a pull request or open an issue on the project repository.

License
This to-do list application is released under the MIT License.

Acknowledgements
This application was developed using the Express framework for the server-side implementation and MySQL for data storage. 