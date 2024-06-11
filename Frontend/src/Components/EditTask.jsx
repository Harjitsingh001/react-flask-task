
import React, { useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { myContext } from '../App';
import './Modal.css';

const EditTask = ({ id, onEditCancel,handleSubmit }) => {
    const { toggle, setToggle } = useContext(myContext);

    const [formData, setFormData] = useState({
        title: id.title,
        description: id.description
    });

    // Handle changes in the input fields
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission


    const handleCancel = () => {
        onEditCancel(id);
        setToggle(false);
    };

    return (
        toggle && (
            <div className='modal'>
                <form onSubmit={()=>handleSubmit(event, formData,id)} className='form'>
                    <FontAwesomeIcon
                        icon={faXmark}
                        style={{ color: 'white', marginLeft: '560px', cursor: 'pointer' }}
                        onClick={handleCancel}
                    />
                    <label htmlFor="title">Title</label>
                    <input
                        type='text'
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleFormChange}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={5}
                        cols={63}
                        value={formData.description}
                        onChange={handleFormChange}
                    />
                    <button  type="submit">Save Task</button>
                </form>
            </div>
        )
    );
};

export default EditTask;
