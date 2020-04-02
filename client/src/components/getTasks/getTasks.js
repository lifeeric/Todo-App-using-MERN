import React from 'react';
import classes from './getTasks.module.scss';
import Loader from '../Loader/Loader';

export default ({ getTasks, deleteTask, editTask, load }) => {

    // Loading 
    let taskList = <p>No Task Yet inserted!</p>

    // if the data has been loaded
    if(getTasks.length > 0)
    {
        taskList = getTasks.map( sin_task => (
            <div             
                key={sin_task._id} 
                className={classes.taskList}>
                <p>{sin_task.title}
                    <span className={classes.action}>
                        <button
                            onClick={() => editTask(sin_task.title, sin_task._id)}     
                            className={classes.__edit}>Edit</button> | 
                        <button
                            onClick={() => deleteTask(sin_task._id) }
                            className={classes.__delete}>Delete</button>
                    </span>
                </p>
            </div>
        ))
    }
    else if (load)
    {
        taskList = <Loader />
    }



    return(
        <div className={classes.container}>
            {taskList}
        </div>
    );
}