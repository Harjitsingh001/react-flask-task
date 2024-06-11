# Fullstack Task Manager Application

## Project Overview

This project is a fullstack web application for managing tasks. It consists of a backend built with Flask and a frontend built with React (using Vite). The backend handles CRUD operations for tasks, while the frontend provides a user interface for interacting with the tasks.

## Project Structure

```plaintext
project-root/
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

1. Navigate to the backend directory: cd Backend

2. Create a virtual environment: python -m venv venv

3. Activate the virtual environment:  .\venv\bin\Activate

4. Run the backend server:  python app.py


## Setting Up the Frontend

1. Navigate to the frontend directory: cd Frontend
2. Install the required dependencies: npm install 
3. Run the frontend development server: npm run dev 
