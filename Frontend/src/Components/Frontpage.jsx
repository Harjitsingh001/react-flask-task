
import React, { useEffect, useState, useContext } from 'react';
import './Frontpage.css';
import Cards from './Cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Addtask from './Addtask';
import Modal from './Modal';
import { myContext } from '../App';

const Frontpage = () => {
    // Holds the list of tasks fetched from the backend
    const [allData, setAllData] = useState([]);
    // A boolean flag from context to show/hide the modal
    const { toggle2, toggle, setToggle } = useContext(myContext);

    // Function to fetch tasks from the backend
    const fetchTasks = async () => {
        try {
            const res = await fetch("http://127.0.0.1:5000/task");
            const data = await res.json();
            setAllData(data);
        } catch (err) {
            console.log(err);
        }
    };

    // Fetch tasks when the component mounts and when `toggle2` changes
    useEffect(() => {
        fetchTasks();
    }, [toggle2, toggle]);

    // Handle delete operation
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://127.0.0.1:5000/task/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                // Remove the deleted task from the state
                setAllData(allData.filter(task => task._id !== id));
            }
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    // Handle submit operation
    const handleSubmit = async (e, data, id) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://127.0.0.1:5000/task/${id._id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                // Trigger a refresh of the task list
                setToggle(prev => !prev);
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            setToggle(false);
        }
    };

    return (
        <div className='containerBox'>
            <div className="leftBox">
                <div className="nameBox">
                    <div className='taskHead'>Task Manager</div>
                    <span>harjit1@gmail.com</span>
                </div>
                <div className="itemBox">
                    <div className="midIcon">
                        <FontAwesomeIcon icon="fa-solid fa-file" />
                        <span>All Task</span>
                    </div>
                    <div className="midIcon">
                        <FontAwesomeIcon icon="fa-solid fa-bookmark" />
                        <span>Important Tasks</span>
                    </div>
                    <div className="midIcon">
                        <FontAwesomeIcon icon="fa-solid fa-check-double" />
                        <span>Completed Tasks</span>
                    </div>
                    <div className="midIcon">
                        <FontAwesomeIcon icon="fa-solid fa-xmark" />
                        <span>Incompleted Tasks</span>
                    </div>
                </div>
                <div className="btnBox">
                    <button>Log Out</button>
                </div>
            </div>
            <div className="rightBox">
                {allData.map((item, i) => (
                    <Cards key={i} item={item} onDelete={handleDelete} handleSubmit={handleSubmit} />
                ))}
                <Addtask />
                {toggle2 && <Modal />}
            </div>
        </div>
    );
};

export default Frontpage;


