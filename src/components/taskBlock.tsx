import React from 'react'
import { Checkbox, TextField, IconButton, makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import './taskBlock.css'
import { Task } from '../models/task';
const useStyles = makeStyles({
    underline: {
        "&&&:before": {
            borderBottom: "none",
        }
    },
    root: {
        paddingLeft: '15px',
        paddingTop: '5px'
    },
    focused: {
        paddingLeft: '0px'
    }
});

type TaskProps = {
    task: Task;
    updateComplitingTask(task: Task): Promise<Task>;
    deleteTask(task: Task): Promise<Task>;
    updateTaskName(task: Task): Promise<Task>;
}
export function TaskBlock({ task, updateComplitingTask, deleteTask, updateTaskName }: TaskProps) {
    const classes = useStyles();
    return (
        <div className='taskContainer'>
            <Checkbox className='checkBox' checked={task.isComplete} onChange={() => { updateComplitingTask(task) }} />
            <TextField className='editTextField' InputProps={{ classes }} defaultValue={task.text} onBlur={(e) => updateTaskName(new Task(task.id, e.target.value, task.isComplete))} />
            <IconButton color='secondary' onClick={() => { deleteTask(task) }} >
                <ClearIcon />
            </IconButton>
        </div>
    )
}

export default TaskBlock