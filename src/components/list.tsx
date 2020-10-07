import React, { Component, ChangeEvent } from 'react';
import { Button, TextField, Paper } from '@material-ui/core';
import './list.css';
import TaskBlock from './taskBlock';
import { Task } from '../models/task';

const btnStyle = {
  color: 'rgb(0, 196, 16)',
  padding: '15px',
  marginLeft: '15px',
  width: '25%',
};
type ListProps = {
  tasks: Task[];
  addNewTask(task: string): Promise<Task>;
  updateTaskState(task: Task): Promise<Task>;
  deleteTask(task: Task): Promise<Task>;
  updateTaskName(task: Task): Promise<Task>;
};
type ListState = {
  newTaskName: string;
};
class List extends Component<ListProps, ListState> {
  constructor(props) {
    super(props);
    this.state = {
      newTaskName: '',
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ newTaskName: e.target.value });
  };

  handleClick = async () => {
    const { newTaskName } = this.state;
    const { addNewTask } = this.props;
    if (newTaskName) {
      await addNewTask(newTaskName);
      this.setState({ newTaskName: '' });
    }
  };

  handleKeyPress = async (event: React.KeyboardEvent) => {
    const { key } = event;
    if (key === 'Enter') {
      await this.handleClick();
    }
  };

  updateTaskState = async (task: Task): Promise<Task> => {
    const { updateTaskState } = this.props;
    const res = await updateTaskState(task);
    return res;
  };

  deleteTask = async (task: Task): Promise<Task> => {
    const { deleteTask } = this.props;
    const res = await deleteTask(task);
    return res;
  };

  updateTaskName = async (task: Task): Promise<Task> => {
    const { updateTaskName } = this.props;
    const res = await updateTaskName(task);
    return res;
  };

  render() {
    let taskList: JSX.Element[];
    const { tasks } = this.props;
    const { newTaskName } = this.state;
    if (tasks) {
      taskList = tasks.map((el) => (
        <TaskBlock
          key={el.id}
          task={el}
          updateComplitingTask={this.updateTaskState}
          deleteTask={this.deleteTask}
          updateTaskName={this.updateTaskName}
        />
      ));
    }
    return (
      <div>
        <Paper elevation={3} className="paper">
          <TextField id="outlined-basic" label="Task" variant="outlined" className="createTextField" onChange={this.handleChange} value={newTaskName} onKeyPress={this.handleKeyPress} />
          <Button variant="outlined" color="inherit" style={btnStyle} onClick={this.handleClick}>Add</Button>
          {taskList}
        </Paper>
      </div>
    );
  }
}

export default List;
