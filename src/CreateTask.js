import React from "react";
import { useState } from "react";
const CreateTask = () => {
    const hrs = [], mns = [], secs = [], pr = [];
    for(let i=0;i<24;i++){
        hrs.push(<option key = {i}> {i} </option>)
    }
    for(let i=0;i<60;i++){
        mns.push(<option key = {i}> {i} </option>)
    }
    for(let i=0;i<60;i++){
        secs.push(<option key = {i}> {i} </option>)
    }
    for(let i=1;i<11;i++){
        pr.push(<option key = {i}> {i} </option>)
    }
    const [taskName, setTaskName] = useState('');
    const [taskDetail, setTaskDetail] = useState('');
    const [m, setM] = useState(0);
    const [h, setH] = useState(0);
    const [s, setS] = useState(0);
    const [p, setP] = useState(0);

    function create_task(e){
        e.preventDefault();
        //console.log({taskName, taskDetail, m, h, s});
        const date = new Date();
        const [month, day, year, hour, minute, second, priority, status, name, details] =
         [date.getMonth(), date.getDate(), date.getFullYear(), h, m, s, p, 'active', taskName, taskDetail];
        const created = {month, day, year, hour, minute, second};
        const task = {name, details, status, created, priority};
        //console.log(task);
        fetch('http://localhost:8000/active/', {
            method : "POST",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify(task)
        })
        .then(console.log("added"));
    }
    return ( 
        <div className="create-task">
            <form>
                <div className="task-text">
                    <label> Task Name </label> <br />
                    <input 
                        type = "text"
                        required
                        value = {taskName}
                        onChange = {(e) => setTaskName(e.target.value)}
                    />
                </div>
                <div className="task-details">
                    <label> Task Details </label> <br />
                    <textarea 
                        required
                        value = {taskDetail}
                        onChange = {(e) => setTaskDetail(e.target.value)}
                    />
                 </div>
                 <div className="deadline">
                    <label> Deadline </label> <br />
                    <select
                        value = {h}
                        onChange = {(e) => setH(e.target.value)}
                    >
                    {hrs}
                    </select>
                    <select
                        value = {m}
                        onChange = {(e) => setM(e.target.value)}
                    >
                    {mns}
                    </select>
                    <select
                        value = {s}
                        onChange = {(e) => setS(e.target.value)}
                    >
                        {secs}
                    </select>
                 </div>
                 <div className="priority-field">
                    <label> Priority </label> <br />
                    <select
                        value = {p}
                        onChange = {(e) => setP(e.target.value)}
                    >
                        {pr}
                    </select>
                 </div>
                 <div className="submit-btn">
                        <button className="submit-task" onClick = {(e) => create_task(e)}>Create Task</button>
                 </div>
                
            </form>
        </div>
     );
}
 
export default CreateTask;