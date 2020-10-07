import React, { Component } from 'react'
import List from './list';
import './container.css'
import { Task } from '../models/task';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

type ContainerState = {
    tasks: Task[];
}
class Container extends Component<{}, ContainerState> {

    constructor(props) {
        super(props)
        this.state = {
            tasks: []
        }
    }
    render() {
        return (
            <div>
                <List tasks={this.state.tasks}
                    addNewTask={this.addNewTask}
                    updateCompitingTask={this.updateComplitingTask}
                    deleteTask={this.deleteTask}
                    updateTaskName={this.updateTaskName} />
            </div>
        )
    }
    async componentDidMount() {
        await this.getAllTasks();
    }

    getAllTasks = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/tasks`)
            .then(o => {
                let data = o.data.map(el => {
                    return el as Task
                })
                this.setState({ tasks: data })
            })
    }
    addNewTask = async (taskText: string): Promise<Task> => {
        let task = new Task(uuidv4(), taskText, false)
        task = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, task) as Task
        await this.getAllTasks();
        return task
    }
    updateComplitingTask = async (task: Task): Promise<Task> => {
        await axios.patch(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, new Task(task.id, task.text, !task.isComplete))
        await this.getAllTasks();
        return;
    }

    deleteTask = async (task: Task): Promise<Task> => {
        await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`)
        await this.getAllTasks();
        return
    }
    updateTaskName = async (task: Task): Promise<Task> => {
        await axios.patch(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, task)
        await this.getAllTasks();
        return;
    }
}

export default Container