##  Fullstack Task Manager Application

## Project Overview

This project is a fullstack web application for managing tasks. It consists of a backend built with Flask and a frontend built with React (using Vite). The backend handles CRUD operations for tasks, while the frontend provides a user interface for interacting with the tasks.

## Project Structure

New-Folder/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── venv/
│   └── (other backend files)
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Addtask.jsx
    │   │   ├── Cards.jsx
    │   │   ├── EditTask.jsx
    │   │   ├── Frontpage.jsx
    │   │   └── Modal.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── (other frontend files)
    ├── index.html
    ├── package.json
    └── (other frontend files)



## Setting Up the Backend

1. Navigate to the backend directory:  cd Backend
2. Create a virtual environment:        .\venv\bin\Activate
3. Run the backend server:              python app.py


##  Setting Up FrontEnd 

1. Navigate to the frontend directory: cd .\Frontend\ 
2. Install the required dependencies:  npm install
3. Run the frontend development server: npm run dev 


##  Components Overview

Frontpage: The main component containing other components such as Cards and Addtask.
Cards: A component to display individual tasks with options to edit or delete.
Addtask: A component for adding new tasks.
EditTask: A component for editing existing tasks.
Modal: A component to show modal dialogs.
