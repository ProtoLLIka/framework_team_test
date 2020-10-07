import React, { Component } from 'react'
import { Button, TextField, Paper } from '@material-ui/core';
import './list.css'
import TaskBlock from './taskBlock';
import { Task } from '../models/task';
const btnStyle = {
    color: 'rgb(0, 196, 16)',
    padding: '15px',
    marginLeft: '15px',
    width: '25%'
}
type ListProps = {
    tasks: Task[];
    addNewTask(task: string): Promise<Task>;
    updateCompitingTask(task: Task): Promise<Task>;
    deleteTask(task: Task): Promise<Task>;
    updateTaskName(task: Task): Promise<Task>;
}
type ListState = {
    tasks: Task[];
    newTaskName: string;
}
class List extends Component<ListProps, ListState> {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            newTaskName: ''
        }
    }

    render() {
        let taskList: JSX.Element[];
        if (this.props.tasks) {
            taskList = this.props.tasks.map((el) => {
                return (<TaskBlock key={el.id} task={el} updateComplitingTask={this.updateComplitingTask} deleteTask={this.deleteTask} updateTaskName={this.updateTaskName} />)
            })
        }
        return (
            <div onKeyPress={this.handleKeyPress}>
                <Paper elevation={3} className='paper' >
                    <TextField id='outlined-basic' label='Task' variant='outlined' className='createTextField' onChange={this.handleChange} value={this.state.newTaskName} />
                    <Button variant='outlined' color='inherit' style={btnStyle} onClick={this.handleClick} >Add</Button>
                    {taskList}
                </Paper>
            </div>
        )
    }
    handleChange = (e) => this.setState({ newTaskName: e.target.value })

    handleClick = () => {
        if (this.state.newTaskName) {
            this.props.addNewTask(this.state.newTaskName);
            this.setState({ newTaskName: '' })
        }
    }
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleClick();
        }
    }

    updateComplitingTask = async (task: Task): Promise<Task> => {
        await this.props.updateCompitingTask(task)
        return
    }
    deleteTask = async (task: Task): Promise<Task> => {
        await this.props.deleteTask(task)
        return
    }
    updateTaskName = async (task: Task): Promise<Task> => {
        await this.props.updateTaskName(task)
        return
    }


}

export default List