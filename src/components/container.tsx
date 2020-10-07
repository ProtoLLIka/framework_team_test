import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import List from './list';
import { Task } from '../models/task';

type ContainerState = {
  tasks: Task[];
};
type ContainerProps = {
};
class Container extends Component<ContainerProps, ContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  async componentDidMount() {
    await this.getAllTasks();
  }

  getAllTasks = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((o) => {
        const data = o.data.map((el) => el as Task);
        this.setState({ tasks: data as Task[] });
      });
  };

  addNewTask = async (taskText: string): Promise<Task> => {
    const task = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, new Task(uuidv4(), taskText, false));
    await this.getAllTasks();
    return task.data as Task;
  };

  updateComplitingTask = async (task: Task): Promise<Task> => {
    const res = await axios.patch(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, new Task(task.id, task.text, !task.isComplete));
    await this.getAllTasks();
    return res.data as Task;
  };

  deleteTask = async (task: Task): Promise<Task> => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`);
    await this.getAllTasks();
    return res.data as Task;
  };

  updateTaskName = async (task: Task): Promise<Task> => {
    const res = await axios.patch(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, task);
    await this.getAllTasks();
    return res.data as Task;
  };

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <List
          tasks={tasks}
          addNewTask={this.addNewTask}
          updateTaskState={this.updateComplitingTask}
          deleteTask={this.deleteTask}
          updateTaskName={this.updateTaskName}
        />
      </div>
    );
  }
}

export default Container;
