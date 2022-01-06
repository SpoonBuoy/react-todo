
import React from "react";
import {useState, useEffect} from 'react';
const ActiveTask = () => {
    const [tasks, setTask] = useState(null);
    const[isPending, setPending] = useState(true);
    const[dif_s, setDif] = useState(null);
    const[e, setE] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8000/active')
        .then(res => {
            return res.json();
        })
        .then((data) =>{
            setTask(data);
            setPending(false);
        })
    }, []);
    if(tasks !== null && e === null){
        var temp = [];
        tasks.map(ele => {
            temp.push(ele.created);
        })
        setE(temp);
    }
    if(e!== null){
        setTimeout(give_difference, 1000);
    }
    function give_difference(){
        const date = new Date();
            const [m_, d_, y_, h_, mi_, s_] = [date.getMonth(), date.getDate(), date.getFullYear(),
                date.getHours(), date.getMinutes(), date.getSeconds()
            ];
        if(e!==null){
            var tot_s = [];
           for(let i=0;i<e.length;i++){
               tot_s[i] = (e[i].hour - h_)*3600 + (e[i].minute - mi_)*60 + (e[i].second - s_);
           }
           setDif(tot_s);
        }
    }
    function done_task(id){
       // console.log(id);
        const new_tasks = tasks.filter(t => t.id !== id);
        var task = {};
        task = tasks[id];
        const [name, details, status, priority] = [task.name, task.details, "completed", task.priority];
        const created = task.created;
        const comp = {name, details, status, priority, created};
        fetch('http://localhost:8000/active/' + id, {method : "DELETE"})
        .then(
            fetch('http://localhost:8000/completed/', {
                 method : "POST",
                 headers : {"content-type" : "application/json"},
                 body : JSON.stringify(comp)
             })
            .then(setTask(new_tasks) )
        )
    }
    function cancel_task(id){
        console.log(id);
    }
    function get_class(num){
        return (num >=0 ? "active-task-name" : "passive-task-name");
    }
    function get_parent_class(num){
        return (num >=0 ? "active-task-list" : "passive-task-list");
    }
    function get_btn_id(num){
        return (num >=0 ? "active-btn" : "passive-btn");
    }
    return ( 
        <div className="active-task">
            <h1> Active Tasks </h1>
            {isPending && <p> Loading ... </p>}
            {tasks && dif_s &&  tasks.map((task) => (
                <div className={get_parent_class(dif_s[task.id])} key = {task.id}>  
                     {dif_s && <div className={get_class(dif_s[task.id])}> <h3>{task.name}</h3>
                        {dif_s && <div className="dif">{dif_s[task.id]}</div>}
                     </div>}
                     <div className="active-task-details"> {task.details}
                    </div>
                     <div className="active-task-footer">
                        <div className="priority">Priority : {task.priority}</div>
                        <div className="task-buttons">
                            <button id = {get_btn_id(dif_s[task.id])} className="done" onClick = {() => done_task(task.id)}> Done </button>
                            <button id = {get_btn_id(dif_s[task.id])} className="cancel-it" onClick = {() => cancel_task(task.id)}> Cancel </button>
                        </div>
                     </div>
                </div>
            ))}
        </div>
     );
}
 
export default ActiveTask;