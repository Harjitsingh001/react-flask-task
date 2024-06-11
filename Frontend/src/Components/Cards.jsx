
import React, { useContext, useState } from 'react';
import './Cards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { myContext } from '../App';
import EditTask from './EditTask';

const Cards = ({ item, onDelete, handleSubmit }) => {
    const { toggle, setToggle } = useContext(myContext);
    const [isToggled, setIsToggled] = useState(item.completion);

    const handleDelete = (id) => {
        onDelete(id);
    };

    const handleUpdateTask = (updatedData) => {
        fetch(`http://127.0.0.1:5000/task/${item._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                setToggle(false);
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    const handleChange = () => {
        const newCompletionStatus = !isToggled;
        setIsToggled(newCompletionStatus);

        fetch(`http://127.0.0.1:5000/task/${item._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completion: newCompletionStatus })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                // Optionally update state if needed
            })
            .catch(error => console.error('There was a problem with the fetch operation:', error));
    };

    const handleEditCancel = () => {
        setToggle(false);
    };

    const handleEditClick = (item) => {
        setEditItem(item);
        setToggle(true);
    };

    return (
        <div className='Card'>
            <div className="headContent">
                <div className='heading'>{item.title}</div>
                <span>{item.description}</span>
            </div>

            {toggle && editItem && (
                <EditTask
                    item={editItem}
                    onEditCancel={handleEditCancel}
                    handleSubmit={handleSubmit}
                    id={item}
                />
            )}

            <div className="btnContent">
                <button
                    onClick={handleChange}
                    className={`toggle-button ${isToggled ? "on" : "off"}`}
                >
                    {isToggled ? 'Complete' : 'Incomplete'}
                </button>

                <FontAwesomeIcon className='cardIcon' icon={faHeart} />
                <FontAwesomeIcon
                    onClick={() => handleEditClick(item)}
                    className='cardIcon'
                    icon={faPenToSquare}
                />
                <FontAwesomeIcon
                    onClick={() => handleDelete(item._id)}
                    className='cardIcon'
                    icon={faTrash}
                />
            </div>
        </div>
    );
};

export default Cards;

