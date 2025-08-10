import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState(() => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [];
});

// use effect for local storage save
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);


// edit k leye states
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');


// add task function
  const handleAddTodo = () => {
    if (task.trim() === '') return;

    const newTask = {
      text: task,
      completed: false,
    };

    setTodos([...todos, newTask]);
    setTask('');
  };


  // delete task function
  const handleDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };


  // toggle complete (line throug wala function)
  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };


  //  edit start krny ka function
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };


  //  update task function
  const handleUpdate = () => {
    if (editText.trim() === '') return;
    const updatedTodos = [...todos];
    updatedTodos[editIndex].text = editText;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText('');
  };


  //  JSX return block (UI part)
  return (
    <div className="todo-container">
      <h1>My Todo App</h1>

     {/* conditional input (edit mode or add mode) */}
      {editIndex !== null ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="input-box"
          />
          <button onClick={handleUpdate} className="add-btn">Update</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input-box"
            placeholder='Enter a task'
          />
          <button onClick={handleAddTodo} className="add-btn">Add Task</button>
        </>
      )}


 {/* Todos list  */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index}
          className="todo-item">
            
            <span
              onClick={() => handleToggleComplete(index)}
              className={todo.completed ? 'completed' : ''}
             >
              {todo.text}
            </span>
            <button onClick={() => handleDelete(index)} className="del-btn">Delete</button>
            <button onClick={() => handleEdit(index)} className="edit-btn">Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// export app
export default App;