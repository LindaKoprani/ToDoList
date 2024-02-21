import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import './index.css'; // Import CSS file

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');
  const [open, setOpen] = useState(false);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const handleEditTask = (taskId, taskText) => {
    setEditTaskId(taskId);
    setEditTaskText(taskText);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditTaskId(null);
    setEditTaskText('');
  };

  const handleSave = () => {
    setTasks(tasks.map(task => (task.id === editTaskId ? { ...task, text: editTaskText } : task)));
    handleClose();
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="todo-list-container" style={{ height: tasks.length === 0 ? '100vh' : 'auto' }}>
      <div className="todo-list-title">To do List</div>
      <div className="todo-list-input-section">
        <TextField
          label="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          variant="outlined"
          fullWidth
          onKeyPress={handleKeyPress}
        />
         <Button className="add-task-button" variant="contained" onClick={addTask}>Add Task</Button> 
      </div>
      <List className="custom-list">
        {tasks.map(task => (
          <ListItem key={task.id} disablePadding>
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <ListItemText primary={task.text} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditTask(task.id, task.text)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(task.id)}>
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <footer className="todo-list-footer">Total Completed Tasks: {completedTasksCount}</footer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={editTaskText}
            onChange={(e) => setEditTaskText(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoList;