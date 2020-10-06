import React, { Component } from 'react'
import { Button, TextField, Paper } from '@material-ui/core';
import './list.css'
import Task from './task';
const btnStyle = {
    color: 'rgb(0, 196, 16)',
    padding: '15px',
    marginLeft: '15px',
    width: '25%'
}

class List extends Component {
    render() {
        return (
            <div>
                <Paper elevation={3} className='paper' >
                    <TextField id='outlined-basic' label='Task' variant='outlined' className='createTextField' />
                    <Button variant='outlined' color='inherit' style={btnStyle} >Add</Button>
                    <Task />
                    <Task />
                    <Task />
                </Paper>
            </div>
        )
    }
}

export default List