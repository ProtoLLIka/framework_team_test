import React from 'react'
import { Checkbox, TextField, IconButton, makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import './task.css'
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
const useStyles1 = makeStyles({
    root: {
        padding: '0px'
    }
});
export function Task() {
    const classes = useStyles();
    const classes1 = useStyles1();
    return (<div className='taskContainer'>
        <Checkbox className='checkBox' />
        <TextField className='editTextField' InputProps={{ classes }} defaultValue='task' />
        <IconButton color='secondary'  >
            <ClearIcon />
        </IconButton>
    </div>)
}
export default Task