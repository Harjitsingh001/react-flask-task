import './Addtask.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { myContext } from '../App';
import { useContext } from 'react';
const Addtask = ()=>{
    const {setToggle2} = useContext(myContext)
    return(
        <>
        <div  className='addTask'>
       
        <FontAwesomeIcon onClick={()=> setToggle2(true)} className='addIcon' icon="fa-solid fa-plus" />
            <h2>Add Task</h2>
        </div>
        </>
    );
}
export default Addtask;