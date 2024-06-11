

import React, { createContext, useState } from 'react';
import './App.css';
import Frontpage from './Components/Frontpage';
import Modal from './Components/Modal';


export const myContext = createContext();

function App() {
    const [toggle, setToggle] = useState(false);
    const [toggle2, setToggle2] = useState(false);  

    return (
        <div className="bg-gray-900 text-white h-screen p-2">
            <myContext.Provider value={{ toggle, setToggle, toggle2, setToggle2 }}>
                <Frontpage />
                
                {toggle2 && <Modal />}
            </myContext.Provider>
        </div>
    );
}

export default App;
