import React from "react";
import { useState, useEffect} from "react";
const CompletedTask = () => {
    const [tasks, setTask] = useState(null);
   useEffect(()=>{
        fetch('http://localhost:8000/completed').
        then(res => {
            return res.json();
        })
        .then(data => {
            setTask(data);
        });
   }, [])
    return (
        <div className="completed-task">
            <h1> Completed Task </h1>
            {tasks && tasks.map((task) => (
                <div className="completed-task-list" key = {task.id}>  
                     <div className="completed-task-name"> Task Name : {task.name} </div>
                     <div className="completed-task-details"> Task Details : {task.details} </div>
                </div>
            ))}
        </div>
      );
}
 
export default CompletedTask;