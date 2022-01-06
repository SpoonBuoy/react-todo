import React from 'react';
import {Link} from 'react-router-dom';
const Nav = () => {
    return ( 
        <div className="navbar">
            <nav>
                <ul>
                    <li className = "active-link"> <Link to = '/active'> Active Tasks </Link></li>
                    <li className='completed-link'> <Link to = '/completed'> Completed Tasks </Link></li>
                    <li className='create-link'> <Link to = '/CreateTask'> Create New Task </Link></li>
                </ul>
            </nav>
        </div>
     );
}
 
export default Nav;