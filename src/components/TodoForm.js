import React, { useState } from 'react'

export default function TodoForm({addTodo}) {
  const [ title, setTitle ] = useState('');
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  return (
    <form onSubmit={e=>{
      e.preventDefault();
      const todo = {
        id: generateId(),
        title,
        completed: false
      }
      addTodo(todo)
      setTitle('')
    }}>
    <input
      type="text"
      className="todo-input"
      placeholder="What do you need to do?"
      onChange={ e => setTitle(e.target.value)}
      value={title}
    />
  </form>
  )
}
