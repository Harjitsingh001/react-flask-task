import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Modal.css";
import { myContext } from '../App';

const Modal = ({ fetchTasks }) => {
    const { toggle2, setToggle2 } = useContext(myContext);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        completion: false
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.title==""){
            return alert("enter title")
        }
        else if( formData.description ==""){
          return  alert("enter descrption")
        }
       
        else{
            fetch("http://127.0.0.1:5000/taskdata", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData, {compltion:false})
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    setFormData({ title: "", description: "", completion: "pending" });
                    setToggle2(false);
                })
                .catch(error => console.error('There was a problem with the fetch operation:', error));
        }
    };

    useEffect(() => {
        if (!toggle2) {
            fetchTasks();
        }
    }, [toggle2, fetchTasks]);

  

    return (
        toggle2 ? (
            <div className='modal'>
                <form onSubmit={handleSubmit} className='form'>
                    <FontAwesomeIcon
                        icon="fa-solid fa-xmark"
                        style={{ color: "white", marginLeft: "560px", cursor: "pointer" }}
                        onClick={() => setToggle2(false)}
                    />
                    <label htmlFor="title">Title</label>
                    <input
                        type='text'
                        id="title"
                        name="title"
                        value={formData.title}
                        placeholder='Enter title'
                        onChange={handleFormChange}
                    />
                    {/* <label htmlFor="completion">Status</label>
                    <input
                        id="completion"
                        name="completion"
                        type={Boolean}
                        // value={formData.completion}
                        onChange={handleFormChange}
                    /> */}
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows={3}
                        cols={63}
                        value={formData.description}
                        placeholder='Enter description'
                        onChange={handleFormChange}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        ) : null
    );
};

export default Modal;
